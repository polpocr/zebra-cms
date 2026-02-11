import { randomUUID } from "node:crypto"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import sharp from "sharp"

const MAX_WIDTH = 1920
const JPEG_QUALITY = 85
const WEBP_QUALITY = 85
const PNG_COMPRESSION = 9

const region = process.env.AWS_REGION ?? "us-east-1"
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
})

const IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"])

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const bucketName = process.env.S3_BUCKET_NAME
  if (!bucketName || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Configuración de almacenamiento incompleta" },
      { status: 500 }
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Formato de solicitud inválido" }, { status: 400 })
  }

  const file = formData.get("file")
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 })
  }

  if (!IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Tipo de archivo no permitido. Use JPEG, PNG, WebP o GIF." },
      { status: 400 }
    )
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const pipeline = sharp(buffer)
    const metadata = await pipeline.metadata()
    const { format } = metadata

    let optimized: Buffer
    let outputExt: string
    let contentType: string
    const width = metadata.width ?? 0

    if (width > MAX_WIDTH) {
      pipeline.resize(MAX_WIDTH, undefined, { withoutEnlargement: true })
    }

    switch (format) {
      case "jpeg":
      case "jpg":
        optimized = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer()
        outputExt = ".jpg"
        contentType = "image/jpeg"
        break
      case "png":
        optimized = await pipeline.png({ compressionLevel: PNG_COMPRESSION }).toBuffer()
        outputExt = ".png"
        contentType = "image/png"
        break
      case "webp":
        optimized = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer()
        outputExt = ".webp"
        contentType = "image/webp"
        break
      case "gif":
        optimized = await pipeline.gif().toBuffer()
        outputExt = ".gif"
        contentType = "image/gif"
        break
      default:
        optimized = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer()
        outputExt = ".jpg"
        contentType = "image/jpeg"
    }

    const key = `uploads/${randomUUID()}${outputExt}`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: optimized,
        ContentType: contentType,
        ACL: "public-read",
      })
    )

    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error("Upload/optimization error:", err)
    return NextResponse.json({ error: "Error al procesar o subir la imagen" }, { status: 500 })
  }
}
