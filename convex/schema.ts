import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  teamMembers: defineTable({
    name: v.string(),
    role: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  services: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  clientCategories: defineTable({
    name: v.string(),
    color: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  clients: defineTable({
    name: v.string(),
    imageUrl: v.optional(v.string()),
    categoryId: v.id("clientCategories"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  contactLeads: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  }),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
})
