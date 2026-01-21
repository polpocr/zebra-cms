"use node"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v } from "convex/values"
import { action } from "./_generated/server"
import { randomUUID } from "node:crypto"

function getRequiredEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `${name} environment variable is not set. Please configure it in the Convex Dashboard under Settings → Environment Variables.`
    )
  }
  return value
}

const region = process.env.AWS_REGION || "us-east-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
})

export const generateUploadUrl = action({
  args: {
    fileName: v.string(),
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }

    // Validate all required environment variables
    const bucketName = getRequiredEnvVar("S3_BUCKET_NAME")
    
    if (!accessKeyId) {
      throw new Error(
        "AWS_ACCESS_KEY_ID environment variable is not set. Please configure it in the Convex Dashboard under Settings → Environment Variables."
      )
    }
    
    if (!secretAccessKey) {
      throw new Error(
        "AWS_SECRET_ACCESS_KEY environment variable is not set. Please configure it in the Convex Dashboard under Settings → Environment Variables."
      )
    }

    // Extract file extension from original filename
    const fileExtension = args.fileName.includes(".")
      ? args.fileName.substring(args.fileName.lastIndexOf("."))
      : ""
    const uuid = randomUUID()
    const key = `uploads/${uuid}${fileExtension}`

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: args.contentType,
      ACL: "public-read",
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`

    return {
      uploadUrl: url,
      storageId: key,
      publicUrl,
    }
  },
})
