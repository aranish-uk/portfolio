// app/api/visit/route.ts
import { NextRequest, NextResponse } from 'next/server'

const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID!
const accountId = process.env.CLOUDFLARE_KV_ACCOUNT_ID!
const token = process.env.CLOUDFLARE_KV_API_TOKEN!

const key = 'total_visits'

// In-memory IP dedup — prevents trivial spam (1 count per IP per 10 min window)
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

  if (isNewVisit) {
    recentVisitors.set(ip, now)
    // Cleanup old entries to prevent memory leak
    if (recentVisitors.size > 10000) {
      for (const [key, ts] of recentVisitors) {
        if (now - ts > DEDUP_WINDOW_MS) recentVisitors.delete(key)
      }
    }

    const newCount = currentCount + 1
    await fetch(base, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: newCount.toString(),
    })
    return NextResponse.json({ count: newCount })
  }

  return NextResponse.json({ count: currentCount })
}
