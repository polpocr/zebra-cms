"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  accept?: string
}

export function FileUpload({ value, onChange, accept = "image/*" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      setUploading(true)
      setProgress(0)

      const formData = new FormData()
      formData.set("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error ?? "Error al subir")
      }

      setProgress(100)
      onChange(data.url)
      toast.success("Archivo subido y optimizado")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error(error instanceof Error ? error.message : "Error al subir el archivo")
      setPreview(null)
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange("")
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative w-full h-48 border rounded-md overflow-hidden">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-8 text-center">
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="cursor-pointer"
              asChild
            >
              <span>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Subiendo..." : "Seleccionar archivo"}
              </span>
            </Button>
          </label>
        </div>
      )}
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">Subiendo archivo...</p>
        </div>
      )}
    </div>
  )
}
