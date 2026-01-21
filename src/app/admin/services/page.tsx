"use client"

import { api } from "convex/_generated/api"
import type { Id } from "@/../../convex/_generated/dataModel"
import { DataTable } from "@/components/admin/data-table"
import { ServiceForm } from "@/components/admin/service-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQuery } from "convex/react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type Service = {
  _id: Id<"services">
  title: string
  description: string
  imageUrl?: string
  createdAt: number
  updatedAt: number
}

export default function ServicesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Id<"services"> | null>(null)

  const services = useQuery(api.services.list)
  const deleteService = useMutation(api.services.remove)

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return
    try {
      await deleteService({ id: serviceToDelete })
      toast.success("Servicio eliminado exitosamente")
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar el servicio")
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingService(null)
  }

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "imageUrl",
      header: "Imagen",
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl") as string | undefined
        return imageUrl ? (
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl}
              alt={row.original.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-md bg-muted" />
        )
      },
    },
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        const description = row.getValue("description") as string
        return (
          <div className="max-w-md truncate" title={description}>
            {description}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const service = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(service)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setServiceToDelete(service._id)
                  setDeleteDialogOpen(true)
                }}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Servicio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle>
            </DialogHeader>
            <ServiceForm initialData={editingService || undefined} onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      {services === undefined ? (
        <div className="text-center py-8 text-muted-foreground">Cargando...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay servicios registrados. Agrega un servicio para comenzar.
        </div>
      ) : (
        <DataTable columns={columns} data={services} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este servicio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
