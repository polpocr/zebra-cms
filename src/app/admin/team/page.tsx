"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { DataTable } from "@/components/admin/data-table"
import { TeamForm } from "@/components/admin/team-form"
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
import { MoreHorizontal, Pencil, Plus, Trash2, ZoomIn } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type TeamMember = {
  _id: Id<"teamMembers">
  name: string
  role: string
  imageUrl?: string
  createdAt: number
  updatedAt: number
}

export default function TeamPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<Id<"teamMembers"> | null>(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const members = useQuery(api.team.list)
  const deleteMember = useMutation(api.team.remove)

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!memberToDelete) return
    try {
      await deleteMember({ id: memberToDelete })
      toast.success("Integrante eliminado exitosamente")
      setDeleteDialogOpen(false)
      setMemberToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar el integrante")
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingMember(null)
  }

  const columns: ColumnDef<TeamMember>[] = [
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
      accessorKey: "role",
      header: "Rol",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(member)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setMemberToDelete(member._id)
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
        <h1 className="text-2xl font-bold">Equipo</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMember(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Integrante
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMember ? "Editar Integrante" : "Nuevo Integrante"}</DialogTitle>
            </DialogHeader>
            <TeamForm initialData={editingMember || undefined} onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>

      {members === undefined ? (
        <div className="text-center py-8 text-muted-foreground">Cargando...</div>
      ) : members.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay integrantes registrados. Agrega un integrante para comenzar.
        </div>
      ) : (
        <DataTable columns={columns} data={members} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este integrante.
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
