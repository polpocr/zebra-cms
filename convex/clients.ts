import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").order("desc").collect()
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect()
    return clients.length
  },
})

export const get = query({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.optional(v.string()),
    categoryId: v.id("clientCategories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const now = Date.now()
    return await ctx.db.insert("clients", {
      name: args.name,
      imageUrl: args.imageUrl,
      categoryId: args.categoryId,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("clients"),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    categoryId: v.optional(v.id("clientCategories")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const { id, ...updates } = args
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.delete(args.id)
  },
})
