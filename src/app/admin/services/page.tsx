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
import { Skeleton } from "@/components/ui/skeleton"
import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQuery } from "convex/react"
import { Briefcase, MoreHorizontal, Pencil, Plus, Trash2, ZoomIn } from "lucide-react"
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
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

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
          <button
            type="button"
            onClick={() => {
              setSelectedImageUrl(imageUrl)
              setImageModalOpen(true)
            }}
            className="group relative h-12 w-12 overflow-hidden rounded-lg transition-all"
          >
            <Image
              src={imageUrl}
              alt={row.original.title}
              fill
              className="rounded-lg object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-5 w-5 text-white" />
            </div>
          </button>
        ) : (
          <div className="h-12 w-12 rounded-lg bg-muted" />
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Servicios</h1>
          <p className="text-muted-foreground text-lg">
            Gestiona los servicios ofrecidos por tu empresa
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)} size="lg" className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingService ? "Editar Servicio" : "Nuevo Servicio"}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm initialData={editingService || undefined} onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      {services === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No hay servicios registrados</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Comienza agregando tu primer servicio para mostrarlo en tu sitio web.
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingService(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primer Servicio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Nuevo Servicio</DialogTitle>
              </DialogHeader>
              <ServiceForm onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
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

      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-4xl !p-0 !border-0 rounded-none">
          <DialogTitle className="sr-only">Imagen ampliada</DialogTitle>
          {selectedImageUrl && (
            <div className="relative aspect-square w-full max-h-[80vh]">
              <Image
                src={selectedImageUrl}
                alt="Imagen ampliada"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
