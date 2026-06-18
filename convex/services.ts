import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { toCdnUrl } from "./cdnUrl"

function mapService<T extends { imageUrl?: string }>(service: T): T {
  return { ...service, imageUrl: toCdnUrl(service.imageUrl) }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").order("desc").collect()
    return services.map(mapService)
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect()
    return services.length
  },
})

export const get = query({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.id)
    return service ? mapService(service) : null
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const now = Date.now()
    return await ctx.db.insert("services", {
      title: args.title,
      description: args.description,
      imageUrl: args.imageUrl,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
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
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.delete(args.id)
  },
})
