const S3_HOST = "zebra-cms.s3.us-east-1.amazonaws.com"
export const CDN_HOST = "d1tqn3oceyjk7h.cloudfront.net"

const S3_ORIGIN = new RegExp(`^https?://${S3_HOST.replace(/\./g, "\\.")}`)

export function toCdnUrl(url: string | undefined): string | undefined {
  if (!url) return url
  return url.replace(S3_ORIGIN, `https://${CDN_HOST}`)
}

export function cdnPublicUrl(key: string): string {
  return `https://${CDN_HOST}/${key}`
}
