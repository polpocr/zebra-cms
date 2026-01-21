"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
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
import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQuery } from "convex/react"
import { Eye, Mail, MoreHorizontal, Phone, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Lead = {
  _id: Id<"contactLeads">
  name: string
  phone: string
  email: string
  subject: string
  message: string
  createdAt: number
  read: boolean
}

export default function LeadsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<Id<"contactLeads"> | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const leads = useQuery(api.leads.list)
  const deleteLead = useMutation(api.leads.remove)
  const markAsRead = useMutation(api.leads.markAsRead)

  const handleView = (lead: Lead) => {
    setSelectedLead(lead)
    setViewDialogOpen(true)
    if (!lead.read) {
      markAsRead({ id: lead._id })
    }
  }

  const handleDelete = async () => {
    if (!leadToDelete) return
    try {
      await deleteLead({ id: leadToDelete })
      toast.success("Lead eliminado exitosamente")
      setDeleteDialogOpen(false)
      setLeadToDelete(null)
    } catch (error) {
      toast.error("Error al eliminar el lead")
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("es-ES")
  }

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
    },
    {
      accessorKey: "subject",
      header: "Asunto",
    },
    {
      accessorKey: "read",
      header: "Estado",
      cell: ({ row }) => {
        const read = row.getValue("read") as boolean
        return <Badge variant={read ? "secondary" : "default"}>{read ? "Leído" : "Nuevo"}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) => {
        const timestamp = row.getValue("createdAt") as number
        return formatDate(timestamp)
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(lead)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLeadToDelete(lead._id)
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
        <h1 className="text-2xl font-bold">Leads de Contacto</h1>
      </div>

      {leads === undefined ? (
        <div className="text-center py-8 text-muted-foreground">Cargando...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hay leads de contacto registrados.
        </div>
      ) : (
        <DataTable columns={columns} data={leads} />
      )}

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Lead</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Información de Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nombre:</span>
                    <span>{selectedLead.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedLead.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Asunto</h3>
                <p>{selectedLead.subject}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mensaje</h3>
                <p className="whitespace-pre-wrap">{selectedLead.message}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Recibido: {formatDate(selectedLead.createdAt)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este lead.
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
