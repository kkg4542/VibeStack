import { ImageResponse } from 'next/og';
import { blogPosts } from "@/lib/blog";

export const alt = 'VibeStack Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

/** Keep the excerpt to what fits under the title in the card. */
function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // Unknown slug -> real 404 instead of a generic 200 card (see tool og route).
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  const titleSize = post.title.length > 60 ? 56 : post.title.length > 36 ? 68 : 84;

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
              {post.category}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: '28px',
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
              {post.title}
            </h1>
            <p
              style={{
                fontSize: 30,
                color: '#9c9ea3',
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: 0,
              }}
            >
              {clip(post.excerpt, 140)}
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
            <span style={{ fontSize: 26, color: '#9c9ea3' }}>By {post.author}</span>
            <div style={{ fontSize: 34, fontWeight: 800, textTransform: 'uppercase', color: '#ff4a1f' }}>
              VibeStack
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
