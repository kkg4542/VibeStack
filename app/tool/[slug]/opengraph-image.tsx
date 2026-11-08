import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools-db';

export const alt = 'VibeStack Tool';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  // Unknown slug -> real 404. Previously this returned a generic "VibeStack" card with
  // HTTP 200, so URLs like /tool/replit-ai/opengraph-image looked like valid crawlable
  // assets to Google and stuck in "Crawled - currently not indexed".
  if (!tool) {
    return new Response('Not Found', { status: 404 });
  }

  const titleSize = tool.title.length > 28 ? 68 : 96;

  // Direction B: graphite ground, one solid orange bar, flat type. No
  // gradients, no tinted pills.
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
            padding: '64px 80px 72px',
          }}
        >
          <div style={{ display: 'flex', marginBottom: '36px' }}>
            <div
              style={{
                padding: '8px 20px',
                background: '#222427',
                color: '#eff0f1',
                fontSize: 24,
                fontWeight: 600,
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
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#eff0f1',
                margin: 0,
              }}
            >
              {tool.title}
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
            <span style={{ fontSize: 30, fontWeight: 800, textTransform: 'uppercase', color: '#ff4a1f' }}>
              VibeStack Directory
            </span>
            <div style={{ fontSize: 30, fontWeight: 600, color: '#eff0f1' }}>
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
