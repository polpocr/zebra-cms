"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, X } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

interface MultiFileUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  max?: number
}

export function MultiFileUpload({ value = [], onChange, max = 3 }: MultiFileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (value.length >= max) {
      toast.error(`Máximo ${max} imágenes permitidas`)
      return
    }

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
      if (!response.ok) throw new Error(data.error ?? "Error al subir")

      setProgress(100)
      onChange([...value, data.url])
      toast.success("Imagen subida")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al subir")
    } finally {
      setUploading(false)
      setProgress(0)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {value.map((url, i) => (
          <div key={url} className="relative aspect-square border rounded-md overflow-hidden">
            <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => handleRemove(i)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">{uploading ? "Subiendo..." : "Agregar"}</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
      />
      {uploading && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">Subiendo imagen...</p>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        {value.length}/{max} imágenes
      </p>
    </div>
  )
}
