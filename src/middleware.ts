import { NextRequest, NextResponse } from 'next/server'

const singURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  // se ñ houver token, faço p login
  // após jogo o user pra onde queria ir
  if (!token) {
    return NextResponse.redirect(singURL, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly max-age=20`
      }
    })
  }

  // deixa o user seguir com a vida dele
  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*'
}
