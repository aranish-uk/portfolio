import { NextRequest } from 'next/server'

const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID!
const accountId = process.env.CLOUDFLARE_KV_ACCOUNT_ID!
const token = process.env.CLOUDFLARE_KV_API_TOKEN!
const key = 'total_visits'

// IP dedup — same logic as /api/visit to prevent badge-load spam
const recentVisitors = new Map<string, number>()
const DEDUP_WINDOW_MS = 10 * 60 * 1000

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()

  const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`

  const current = await fetch(base, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.ok ? res.text() : '0')

  const currentCount = parseInt(current || '0') || 0
  const lastVisit = recentVisitors.get(ip)
  const isNewVisit = !lastVisit || now - lastVisit > DEDUP_WINDOW_MS

  let displayCount = currentCount

  if (isNewVisit) {
    recentVisitors.set(ip, now)
    if (recentVisitors.size > 10000) {
      for (const [k, ts] of recentVisitors) {
        if (now - ts > DEDUP_WINDOW_MS) recentVisitors.delete(k)
      }
    }

    displayCount = currentCount + 1
    await fetch(base, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: displayCount.toString(),
    })
  }

  const safeCount = String(Math.max(0, displayCount))

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="130" height="30">
    <rect width="130" height="30" fill="#1e1e1e" rx="4"/>
    <text x="10" y="20" fill="#ffffff" font-family="monospace" font-size="14">
      Visits: ${safeCount}
    </text>
  </svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store',
    },
  })
}
