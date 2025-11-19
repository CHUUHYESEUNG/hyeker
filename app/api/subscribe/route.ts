import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// 구독자를 관리할 Resend Audience ID
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // 이메일 유효성 검사
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "올바른 이메일 주소를 입력해주세요." },
        { status: 400 }
      )
    }

    // Resend API 키가 설정되지 않은 경우
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY가 설정되지 않았습니다.")
      return NextResponse.json(
        { error: "서버 설정 오류입니다. 관리자에게 문의해주세요." },
        { status: 500 }
      )
    }

    // Resend 클라이언트 초기화 (런타임에만)
    const resend = new Resend(process.env.RESEND_API_KEY)

    // AUDIENCE_ID가 설정되지 않은 경우 (옵션)
    if (!AUDIENCE_ID) {
      console.warn("RESEND_AUDIENCE_ID가 설정되지 않았습니다. 이메일만 전송됩니다.")
    }

    // 방법 1: Resend Audience에 구독자 추가 (추천)
    if (AUDIENCE_ID) {
      try {
        const contact = await resend.contacts.create({
          email,
          audienceId: AUDIENCE_ID,
        })

        console.log("Resend Audience에 구독자 추가:", contact)
      } catch (audienceError: any) {
        // 이미 구독된 이메일인 경우
        if (audienceError?.message?.includes("already exists")) {
          return NextResponse.json(
            { error: "이미 구독된 이메일 주소입니다." },
            { status: 409 }
          )
        }
        throw audienceError
      }
    }

    // 방법 2: 웰컴 이메일 전송
    try {
      const emailData = await resend.emails.send({
        // TODO: 도메인 인증 후 "HYEKER STUDIO <hey@hyeker.com>"로 변경
        from: "HYEKER STUDIO <onboarding@resend.dev>",
        to: email,
        subject: "🎉 HYEKER STUDIO 뉴스레터 구독을 환영합니다!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>HYEKER STUDIO 뉴스레터 구독 환영</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 40px 30px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">
                  🎉 구독해주셔서 감사합니다!
                </h1>
              </div>

              <div style="background: #f9fafb; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
                <h2 style="color: #1f2937; font-size: 20px; margin-top: 0;">안녕하세요, HYEKER입니다!</h2>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                  HYEKER STUDIO 뉴스레터를 구독해주셔서 진심으로 감사드립니다.
                </p>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                  앞으로 개발, 디자인, 그리고 1인 개발자로서의 경험과 인사이트를 정기적으로 공유하겠습니다.
                </p>
              </div>

              <div style="background: #fff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
                <h3 style="color: #1f2937; font-size: 18px; margin-top: 0;">📬 어떤 내용을 받으실 수 있나요?</h3>
                <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                  <li>새로운 블로그 포스트 알림</li>
                  <li>프로젝트 개발 과정과 회고</li>
                  <li>유용한 개발 팁과 도구 소개</li>
                  <li>1인 개발자의 성장 이야기</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://hyeker.com/blog" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  블로그 둘러보기 →
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
                <p style="color: #9ca3af; font-size: 13px; margin: 5px 0;">
                  HYEKER STUDIO | <a href="https://hyeker.com" style="color: #667eea; text-decoration: none;">hyeker.com</a>
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 15px 0 5px;">
                  더 이상 이메일을 받고 싶지 않으신가요?
                  <a href="https://hyeker.com/unsubscribe" style="color: #667eea; text-decoration: underline;">구독 취소</a>
                </p>
              </div>
            </body>
          </html>
        `,
      })

      console.log("웰컴 이메일 전송 완료:", emailData)
    } catch (emailError) {
      console.error("웰컴 이메일 전송 실패:", emailError)
      // 이메일 전송 실패해도 구독은 성공으로 처리 (Audience에는 추가됨)
    }

    return NextResponse.json(
      {
        success: true,
        message: "구독해주셔서 감사합니다! 이메일을 확인해주세요.",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("구독 처리 중 오류:", error)

    return NextResponse.json(
      {
        error: error.message || "구독 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    )
  }
}
