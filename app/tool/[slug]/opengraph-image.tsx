import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools-db';

export const alt = 'VibeStack Tool';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#09090b',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          VibeStack
        </div>
      )
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <div
            style={{
              padding: '8px 24px',
              background: 'rgba(56, 189, 248, 0.1)',
              color: '#38bdf8',
              borderRadius: '9999px',
              fontSize: 24,
              fontWeight: 600,
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
          >
            {tool.category || 'AI Tool'}
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
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
            }}
          >
            {tool.title}
          </h1>
          <p
            style={{
              fontSize: 36,
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '90%',
              margin: 0,
            }}
          >
            {tool.description}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: 32, fontWeight: 'bold', color: '#fcd34d' }}>
              VibeStack Directory
            </span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, fontStyle: 'italic', color: '#818cf8' }}>
            usevibestack.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
