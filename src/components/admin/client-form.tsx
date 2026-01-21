"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { FileUpload } from "./file-upload"

const clientSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es requerida"),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  initialData?: {
    _id: Id<"clients">
    name: string
    imageUrl?: string
    categoryId: Id<"clientCategories">
  }
  onSuccess?: () => void
}

export function ClientForm({ initialData, onSuccess }: ClientFormProps) {
  const create = useMutation(api.clients.create)
  const update = useMutation(api.clients.update)
  const categories = useQuery(api.categories.list)

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || "",
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId || "",
    },
  })

  const onSubmit = async (values: ClientFormValues) => {
    try {
      if (initialData) {
        await update({
          id: initialData._id,
          name: values.name,
          imageUrl: values.imageUrl,
          categoryId: values.categoryId as Id<"clientCategories">,
        })
        toast.success("Cliente actualizado exitosamente")
      } else {
        await create({
          name: values.name,
          imageUrl: values.imageUrl,
          categoryId: values.categoryId as Id<"clientCategories">,
        })
        toast.success("Cliente creado exitosamente")
      }
      onSuccess?.()
    } catch (error) {
      toast.error("Error al guardar el cliente")
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
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
