"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { CategoryForm } from "@/components/admin/category-form"
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
import { Badge } from "@/components/ui/badge"
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
import { MoreHorizontal, Pencil, Plus, Tag, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Category = {
  _id: Id<"clientCategories">
  name: string
  color: string
  createdAt: number
  updatedAt: number
}

export default function CategoriesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Id<"clientCategories"> | null>(null)

  const categories = useQuery(api.categories.list)
  const deleteCategory = useMutation(api.categories.remove)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!categoryToDelete) return
    try {
      await deleteCategory({ id: categoryToDelete })
      toast.success("Categoría eliminada exitosamente")
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar la categoría")
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingCategory(null)
  }

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => {
        const color = row.getValue("color") as string
        return (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: color }} />
            <Badge style={{ backgroundColor: color, color: "#fff" }}>{color}</Badge>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const category = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(category)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCategoryToDelete(category._id)
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
          <h1 className="text-4xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground text-lg">
            Organiza tus clientes por categorías
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCategory(null)} size="lg" className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Categoría
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              initialData={editingCategory || undefined}
              onSuccess={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      {categories === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Tag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No hay categorías registradas</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Crea categorías para organizar y filtrar tus clientes.
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primera Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Nueva Categoría</DialogTitle>
              </DialogHeader>
              <CategoryForm onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <DataTable columns={columns} data={categories} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente esta categoría.
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
