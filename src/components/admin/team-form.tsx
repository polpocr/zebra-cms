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
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { FileUpload } from "./file-upload"

const teamSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  role: z.string().min(1, "El rol es requerido"),
  imageUrl: z.string().optional(),
})

type TeamFormValues = z.infer<typeof teamSchema>

interface TeamFormProps {
  initialData?: {
    _id: Id<"teamMembers">
    name: string
    role: string
    imageUrl?: string
  }
  onSuccess?: () => void
}

export function TeamForm({ initialData, onSuccess }: TeamFormProps) {
  const create = useMutation(api.team.create)
  const update = useMutation(api.team.update)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      imageUrl: initialData?.imageUrl || "",
    },
  })

  const onSubmit = async (values: TeamFormValues) => {
    try {
      if (initialData) {
        await update({
          id: initialData._id,
          ...values,
        })
        toast.success("Integrante actualizado exitosamente")
      } else {
        await create(values)
        toast.success("Integrante creado exitosamente")
      }
      onSuccess?.()
    } catch (error) {
      toast.error("Error al guardar el integrante")
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
