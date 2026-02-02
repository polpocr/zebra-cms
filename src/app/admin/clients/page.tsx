"use client"

import { ClientForm } from "@/components/admin/client-form"
import { DataTable } from "@/components/admin/data-table"
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
import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { Building2, MoreHorizontal, Pencil, Plus, Trash2, ZoomIn } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type Client = {
  _id: Id<"clients">
  name: string
  imageUrl?: string
  categoryId: Id<"clientCategories">
  createdAt: number
  updatedAt: number
}

export default function ClientsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<Id<"clients"> | null>(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const clients = useQuery(api.clients.list)
  const categories = useQuery(api.categories.list)
  const deleteClient = useMutation(api.clients.remove)

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!clientToDelete) return
    try {
      await deleteClient({ id: clientToDelete })
      toast.success("Cliente eliminado exitosamente")
      setDeleteDialogOpen(false)
      setClientToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar el cliente")
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingClient(null)
  }

  const getCategoryName = (categoryId: Id<"clientCategories">) => {
    return categories?.find((cat) => cat._id === categoryId)?.name || "N/A"
  }

  const columns: ColumnDef<Client>[] = [
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
              alt={row.original.name}
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
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "categoryId",
      header: "Categoría",
      cell: ({ row }) => {
        const categoryId = row.getValue("categoryId") as Id<"clientCategories">
        return getCategoryName(categoryId)
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(client)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setClientToDelete(client._id)
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
          <h1 className="text-4xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground text-lg">Gestiona los clientes de tu portafolio</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClient(null)} size="lg" className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
              </DialogTitle>
            </DialogHeader>
            <ClientForm initialData={editingClient || undefined} onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      {clients === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No hay clientes registrados</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Comienza agregando clientes para mostrarlos en tu portafolio.
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingClient(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primer Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Nuevo Cliente</DialogTitle>
              </DialogHeader>
              <ClientForm onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <DataTable columns={columns} data={clients} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este cliente.
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
              <Image src={selectedImageUrl} alt="Imagen ampliada" fill className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
