---
name: image-optimization-sharp
description: Optimize images with Sharp (resize, compress, format). Use when adding or changing image upload flows, optimizing assets, or when the user asks for Sharp, image optimization, or compression.
---

# Image Optimization with Sharp

## When to Use

- Upload flows that accept images (API routes, server actions).
- Resizing, compressing, or converting images on the server.
- Generating thumbnails or multiple sizes.

## Stack

- **Library**: `sharp` (Node.js only; not in browser).
- **Typical env**: Next.js API Route or Convex Node action; receive `File`/`Buffer`, process, then upload to S3 or return.

## Quick Pattern

```typescript
import sharp from "sharp"

const buffer = Buffer.from(await file.arrayBuffer())
const pipeline = sharp(buffer)

// Resize if too large (keep aspect ratio)
const metadata = await pipeline.metadata()
if ((metadata.width ?? 0) > 1920) {
  pipeline.resize(1920, undefined, { withoutEnlargement: true })
}

// Format-specific quality
const optimized =
  metadata.format === "jpeg" || metadata.format === "jpg"
    ? await pipeline.jpeg({ quality: 85 }).toBuffer()
    : metadata.format === "png"
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.webp({ quality: 85 }).toBuffer()
```

## Conventions in This Project

- **Max width**: 1920px (resize only if larger; `withoutEnlargement: true`).
- **JPEG**: quality 85.
- **WebP**: quality 85.
- **PNG**: `compressionLevel: 9`.
- **GIF**: pass through (`.gif()`) or convert if you need smaller size.
- **Output**: preserve format for compatibility; set `Content-Type` and file extension to the actual output format when uploading to S3.

## Auth and Upload

- Protect the upload endpoint (e.g. Clerk `auth()` in Next.js; require signed-in user).
- Validate `Content-Type` (e.g. `image/jpeg`, `image/png`, `image/webp`, `image/gif`).
- Upload optimized buffer to storage (e.g. S3 `PutObjectCommand`) with correct `ContentType` and key extension.

## Env

For Next.js API routes that upload to S3: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME` must be set in Next.js env (e.g. `.env.local`, Vercel).

## Reference in This Repo

- `src/app/api/upload-image/route.ts`: full example (auth, Sharp, S3 upload).
- `src/components/admin/file-upload.tsx`: client POST to `/api/upload-image`.
