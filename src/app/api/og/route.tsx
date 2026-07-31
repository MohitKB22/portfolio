import { ImageResponse } from 'next/og';
import { portfolio } from '@/data';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 } as const;

/** Dynamic OpenGraph image. `?title=` and `?subtitle=` override the defaults. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? portfolio.profile.title;
  const subtitle = searchParams.get('subtitle') ?? portfolio.profile.tagline;

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#050a14',
        padding: '72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(700px 500px at 8% -10%, rgba(45,124,255,0.30), transparent 65%), radial-gradient(600px 460px at 95% 10%, rgba(124,90,255,0.22), transparent 65%)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 18,
            border: '1px solid rgba(45,124,255,0.45)',
            background: 'rgba(45,124,255,0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f5f7fa',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {portfolio.profile.initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#f5f7fa', fontSize: 28, fontWeight: 600 }}>
            {portfolio.profile.name}
          </span>
          <span style={{ color: '#8ea2c6', fontSize: 19, letterSpacing: 2 }}>
            {portfolio.profile.location.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <span
          style={{
            color: '#5aa8ff',
            fontSize: 21,
            letterSpacing: 5,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          {portfolio.profile.title}
        </span>
        <span
          style={{
            color: '#f5f7fa',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        <span style={{ color: '#8ea2c6', fontSize: 26, marginTop: 24, maxWidth: 900 }}>
          {subtitle}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          borderTop: '1px solid rgba(255,255,255,0.10)',
          paddingTop: 28,
        }}
      >
        <span style={{ color: '#64789c', fontSize: 21 }}>github.com/MohitKB22</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {['LLMs', 'RAG', 'Agents', 'MLOps'].map((tag) => (
            <span
              key={tag}
              style={{
                color: '#5aa8ff',
                fontSize: 19,
                border: '1px solid rgba(45,124,255,0.35)',
                background: 'rgba(45,124,255,0.12)',
                borderRadius: 999,
                padding: '8px 18px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>,
    SIZE,
  );
}
