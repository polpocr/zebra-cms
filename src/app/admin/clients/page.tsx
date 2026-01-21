"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
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
import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQuery } from "convex/react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
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
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl}
              alt={row.original.name}
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClient(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClient ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
            </DialogHeader>
            <ClientForm initialData={editingClient || undefined} onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      {clients === undefined ? (
        <div className="text-center py-8 text-muted-foreground">Cargando...</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay clientes registrados. Agrega un cliente para comenzar.
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
    </div>
  )
}
