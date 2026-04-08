import { ImageResponse } from 'next/og'

export const alt = 'Abhinav Ranish — Software Engineer, Cybersecurity & AI'
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
          background: '#0a0a0a',
          position: 'relative',
          fontFamily: 'monospace',
          padding: '40px',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #ec4899, #a855f7, #ec4899)',
          }}
        />

        {/* Left column - Terminal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginRight: '32px',
          }}
        >
          {/* Terminal window */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#111111',
              borderRadius: '12px',
              border: '1px solid #222',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #222',
                gap: '8px',
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ec4899' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a855f7' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
              <span style={{ marginLeft: '12px', fontSize: '13px', color: '#555', fontFamily: 'monospace' }}>
                abhinav@asu ~ portfolio
              </span>
            </div>

            {/* Terminal content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                gap: '6px',
                fontSize: '15px',
                lineHeight: 1.7,
              }}
            >
              {/* whoami */}
              <div style={{ display: 'flex' }}>
                <span style={{ color: '#ec4899' }}>~</span>
                <span style={{ color: '#666', marginLeft: '8px', marginRight: '8px' }}>$</span>
                <span style={{ color: '#e4e4e7' }}>whoami</span>
              </div>
              <div style={{ display: 'flex', color: '#a1a1aa', paddingLeft: '24px' }}>
                Abhinav Ranish
              </div>

              {/* role */}
              <div style={{ display: 'flex', marginTop: '4px' }}>
                <span style={{ color: '#ec4899' }}>~</span>
                <span style={{ color: '#666', marginLeft: '8px', marginRight: '8px' }}>$</span>
                <span style={{ color: '#e4e4e7' }}>cat role.txt</span>
              </div>
              <div style={{ display: 'flex', color: '#a1a1aa', paddingLeft: '24px' }}>
                Software Engineer | Cybersecurity | AI/ML
              </div>

              {/* skills */}
              <div style={{ display: 'flex', marginTop: '4px' }}>
                <span style={{ color: '#ec4899' }}>~</span>
                <span style={{ color: '#666', marginLeft: '8px', marginRight: '8px' }}>$</span>
                <span style={{ color: '#e4e4e7' }}>ls skills/</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '24px', marginTop: '2px' }}>
                {['TypeScript', 'Python', 'React', 'Next.js', 'AWS', 'Pentest'].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '2px 10px',
                      borderRadius: '4px',
                      background: '#ec489915',
                      border: '1px solid #ec489930',
                      color: '#f472b6',
                      fontSize: '13px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* location */}
              <div style={{ display: 'flex', marginTop: '8px' }}>
                <span style={{ color: '#ec4899' }}>~</span>
                <span style={{ color: '#666', marginLeft: '8px', marginRight: '8px' }}>$</span>
                <span style={{ color: '#e4e4e7' }}>echo $LOCATION</span>
              </div>
              <div style={{ display: 'flex', color: '#a1a1aa', paddingLeft: '24px' }}>
                Arizona State University — Fulton Engineering
              </div>

              {/* cursor */}
              <div style={{ display: 'flex', marginTop: '8px' }}>
                <span style={{ color: '#ec4899' }}>~</span>
                <span style={{ color: '#666', marginLeft: '8px', marginRight: '8px' }}>$</span>
                <span style={{ color: '#ec4899', opacity: 0.8 }}>_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '320px',
            gap: '16px',
          }}
        >
          {/* Name card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#111111',
              borderRadius: '12px',
              border: '1px solid #222',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 800,
                fontFamily: 'system-ui, sans-serif',
                background: 'linear-gradient(90deg, #f472b6, #c084fc)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-1px',
              }}
            >
              Abhinav Ranish
            </div>
            <div style={{ fontSize: '14px', color: '#71717a', marginTop: '6px', fontFamily: 'system-ui, sans-serif' }}>
              aranish.uk
            </div>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: '#111111',
                borderRadius: '12px',
                border: '1px solid #222',
                padding: '20px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#ec4899', fontFamily: 'system-ui, sans-serif' }}>6x</span>
              <span style={{ fontSize: '11px', color: '#71717a', marginTop: '4px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>Dean&apos;s List</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: '#111111',
                borderRadius: '12px',
                border: '1px solid #222',
                padding: '20px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#a855f7', fontFamily: 'system-ui, sans-serif' }}>15+</span>
              <span style={{ fontSize: '11px', color: '#71717a', marginTop: '4px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>Projects</span>
            </div>
          </div>

          {/* Status */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#111111',
              borderRadius: '12px',
              border: '1px solid #222',
              padding: '20px',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '13px', color: '#a1a1aa', fontFamily: 'system-ui, sans-serif' }}>Open to opportunities</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899' }} />
              <span style={{ fontSize: '13px', color: '#a1a1aa', fontFamily: 'system-ui, sans-serif' }}>Building cool stuff</span>
            </div>
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              flex: 1,
              alignContent: 'flex-end',
            }}
          >
            {['Full-Stack', 'Security', 'AI/ML', 'Cloud'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: '#111111',
                  border: '1px solid #222',
                  color: '#a1a1aa',
                  fontSize: '12px',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
