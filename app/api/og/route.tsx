import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // 파라미터 추출
    const title = searchParams.get('title') || '혜커 HYEKER'
    const description = searchParams.get('description') || '1인 인디 개발자의 블로그'
    const type = searchParams.get('type') || 'default' // default, blog, portfolio

    // 타입별 그라데이션 색상
    const gradients = {
      default: { from: '#6366f1', to: '#8b5cf6' }, // 인디고 -> 바이올렛
      blog: { from: '#3b82f6', to: '#06b6d4' },    // 블루 -> 시안
      portfolio: { from: '#f59e0b', to: '#ef4444' }, // 앰버 -> 레드
    }

    const gradient = gradients[type as keyof typeof gradients] || gradients.default

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundImage: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            padding: '60px',
          }}
        >
          {/* 배경 패턴 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              display: 'flex',
            }}
          />

          {/* 로고/브랜드 */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              H
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              HYEKER
            </span>
          </div>

          {/* 타입 뱃지 */}
          {type !== 'default' && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '60px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
              }}
            >
              {type === 'blog' ? 'Blog' : 'Portfolio'}
            </div>
          )}

          {/* 메인 콘텐츠 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '90%',
            }}
          >
            {/* 타이틀 */}
            <h1
              style={{
                fontSize: title.length > 30 ? '48px' : '56px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </h1>

            {/* 설명 */}
            {description && (
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.4,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* 하단 장식 라인 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                display: 'flex',
              }}
            />
            <div
              style={{
                width: '20px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                display: 'flex',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG Image generation error:', error)
    return new Response('Failed to generate OG image', { status: 500 })
  }
}
