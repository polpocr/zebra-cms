"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { FileUpload } from "./file-upload"

const brandSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  tagline: z.string().optional(),
  logoUrl: z.string().optional(),
})

type BrandFormValues = z.infer<typeof brandSchema>

interface BrandFormProps {
  initialData?: {
    _id: Id<"brands">
    name: string
    tagline?: string
    logoUrl?: string
  }
  onSuccess?: () => void
}

export function BrandForm({ initialData, onSuccess }: BrandFormProps) {
  const create = useMutation(api.brands.create)
  const update = useMutation(api.brands.update)

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: initialData?.name || "",
      tagline: initialData?.tagline || "",
      logoUrl: initialData?.logoUrl || "",
    },
  })

  const prevIdRef = useRef<Id<"brands"> | null>(null)
  useEffect(() => {
    const id = initialData?._id ?? null
    if (id !== prevIdRef.current) {
      prevIdRef.current = id
      form.reset({
        name: initialData?.name ?? "",
        tagline: initialData?.tagline ?? "",
        logoUrl: initialData?.logoUrl ?? "",
      })
    }
  }, [initialData?._id, initialData?.name, initialData?.tagline, initialData?.logoUrl, form])

  const onSubmit = async (values: BrandFormValues) => {
    try {
      if (initialData) {
        await update({
          id: initialData._id,
          name: values.name,
          tagline: values.tagline ?? undefined,
          logoUrl: values.logoUrl ?? undefined,
        })
        toast.success("Marca actualizada exitosamente")
      } else {
        await create({
          name: values.name,
          tagline: values.tagline || undefined,
          logoUrl: values.logoUrl,
        })
        toast.success("Marca creada exitosamente")
        form.reset()
      }
      onSuccess?.()
    } catch (error) {
      toast.error("Error al guardar la marca")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline (opcional)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <FileUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
