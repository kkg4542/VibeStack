import { ImageResponse } from 'next/og';
import { stacks } from '@/lib/stacks';

export const alt = 'VibeStack Curated Stack';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ stackId: string }> }) {
  const { stackId } = await params;
  const stack = stacks.find((s) => s.id === stackId);

  // Unknown stack id -> real 404 instead of a generic 200 card (see tool og route).
  if (!stack) {
    return new Response('Not Found', { status: 404 });
  }

  // Direction B: graphite ground, one solid orange bar, flat type. No
  // gradients, no emoji, no tinted pills.
  return new ImageResponse(
    (
      <div
        style={{
          background: '#18191b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: '#eff0f1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', width: '100%', height: 8, background: '#ff4a1f' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '72px 80px 80px',
          }}
        >
          <div style={{ display: 'flex', marginBottom: '40px' }}>
            <div
              style={{
                padding: '8px 20px',
                background: '#222427',
                color: '#eff0f1',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Curated Stack
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#eff0f1',
                margin: 0,
              }}
            >
              {stack.name}
            </h1>
            <p
              style={{
                fontSize: 34,
                color: '#9c9ea3',
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: 0,
              }}
            >
              {stack.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 800, color: '#ff4a1f' }}>
              {stack.tools.length} {stack.tools.length === 1 ? 'tool' : 'tools'}
            </span>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#eff0f1' }}>
              usevibestack.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
