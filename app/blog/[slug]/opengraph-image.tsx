import { ImageResponse } from 'next/og';
import { blogPosts } from "@/lib/blog";

export const alt = 'VibeStack Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
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
          background: 'linear-gradient(to bottom right, #09090b, #312e81)',
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
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
              borderRadius: '9999px',
              fontSize: 24,
              fontWeight: 600,
              border: '1px solid rgba(99, 102, 241, 0.3)',
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
            gap: '32px',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '90%',
              margin: 0,
            }}
          >
            {post.excerpt}
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
             <span style={{ fontSize: 24, color: '#a1a1aa' }}>By {post.author}</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, fontStyle: 'italic', color: '#c084fc' }}>
            VibeStack
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
