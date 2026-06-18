import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { toCdnUrl } from "./cdnUrl"

function mapTeamMember<T extends { imageUrl?: string }>(member: T): T {
  return { ...member, imageUrl: toCdnUrl(member.imageUrl) }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("teamMembers").order("desc").collect()
    return members.map(mapTeamMember)
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("teamMembers").collect()
    return members.length
  },
})

export const get = query({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.id)
    return member ? mapTeamMember(member) : null
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    const now = Date.now()
    return await ctx.db.insert("teamMembers", {
      name: args.name,
      role: args.role,
      imageUrl: args.imageUrl,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("teamMembers"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
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
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.delete(args.id)
  },
})
