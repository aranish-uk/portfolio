import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Abhinav Ranish — Software Engineer, Cybersecurity, AI/ML'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #f472b6, #c084fc, #60a5fa)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            Abhinav Ranish
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#f472b6',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Coder &bull; Cyber Risk &bull; AI Developer
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#a1a1aa',
              maxWidth: '700px',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Building secure, intelligent systems with speed, scale, and creativity.
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#52525b',
            letterSpacing: '1px',
          }}
        >
          aranish.uk
        </div>
      </div>
    ),
    { ...size }
  )
}
