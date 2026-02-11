"use client"

import { BrandForm } from "@/components/admin/brand-form"
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
import { Award, MoreHorizontal, Pencil, Plus, Trash2, ZoomIn } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type Brand = {
  _id: Id<"brands">
  name: string
  tagline?: string
  logoUrl?: string
  createdAt: number
  updatedAt: number
}

export default function BrandsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [brandToDelete, setBrandToDelete] = useState<Id<"brands"> | null>(null)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const brands = useQuery(api.brands.list)
  const deleteBrand = useMutation(api.brands.remove)

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!brandToDelete) return
    try {
      await deleteBrand({ id: brandToDelete })
      toast.success("Marca eliminada exitosamente")
      setDeleteDialogOpen(false)
      setBrandToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar la marca")
    }
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingBrand(null)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const columns: ColumnDef<Brand>[] = [
    {
      accessorKey: "logoUrl",
      header: "Logo",
      cell: ({ row }) => {
        const logoUrl = row.getValue("logoUrl") as string | undefined
        const name = row.original.name
        return logoUrl ? (
          <button
            type="button"
            onClick={() => {
              setSelectedImageUrl(logoUrl)
              setImageModalOpen(true)
            }}
            className="group relative h-12 w-12 overflow-hidden rounded-lg transition-all"
          >
            <Image
              src={logoUrl}
              alt={name}
              fill
              className="rounded-lg object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-5 w-5 text-white" />
            </div>
          </button>
        ) : (
          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-lg font-bold text-foreground/60">
            {getInitials(name)}
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "tagline",
      header: "Tagline",
      cell: ({ row }) => {
        const tagline = row.getValue("tagline") as string | undefined
        return <div className="max-w-md truncate text-muted-foreground">{tagline ?? "—"}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const brand = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(brand)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setBrandToDelete(brand._id)
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
          <h1 className="text-4xl font-bold tracking-tight">Marcas</h1>
          <p className="text-muted-foreground text-lg">
            Gestiona las marcas que son parte de tu manada
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingBrand(null)
                setDialogOpen(true)
              }}
              size="lg"
              className="shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Marca
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingBrand ? "Editar Marca" : "Nueva Marca"}
              </DialogTitle>
            </DialogHeader>
            <BrandForm
              initialData={editingBrand || undefined}
              onSuccess={() => handleDialogClose(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {brands === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Award className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No hay marcas registradas</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Comienza agregando marcas para mostrarlas en tu página principal.
          </p>
          <Button
            onClick={() => {
              setEditingBrand(null)
              setDialogOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Primera Marca
          </Button>
        </div>
      ) : (
        <DataTable columns={columns} data={brands} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente esta marca.
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
