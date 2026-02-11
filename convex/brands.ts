import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("brands").order("desc").collect()
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const brands = await ctx.db.query("brands").collect()
    return brands.length
  },
})

export const get = query({
  args: { id: v.id("brands") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    tagline: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const now = Date.now()
    return await ctx.db.insert("brands", {
      name: args.name,
      tagline: args.tagline,
      logoUrl: args.logoUrl,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("brands"),
    name: v.optional(v.string()),
    tagline: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const { id, name, tagline, logoUrl } = args
    const patch: Record<string, unknown> = { updatedAt: Date.now() }
    if (name !== undefined) patch.name = name
    if (tagline !== undefined) patch.tagline = tagline
    if (logoUrl !== undefined) patch.logoUrl = logoUrl
    await ctx.db.patch(id, patch)
  },
})

export const remove = mutation({
  args: { id: v.id("brands") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.delete(args.id)
  },
})
