import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contactLeads").order("desc").collect()
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db.query("contactLeads").collect()
    return leads.length
  },
})

export const unreadCount = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db
      .query("contactLeads")
      .filter((q) => q.eq(q.field("read"), false))
      .collect()
    return leads.length
  },
})

export const get = query({
  args: { id: v.id("contactLeads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert("contactLeads", {
      name: args.name,
      phone: args.phone,
      email: args.email,
      subject: args.subject,
      message: args.message,
      createdAt: now,
      read: false,
    })
  },
})

export const markAsRead = mutation({
  args: { id: v.id("contactLeads") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.patch(args.id, {
      read: true,
    })
  },
})

export const remove = mutation({
  args: { id: v.id("contactLeads") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    await ctx.db.delete(args.id)
  },
})
