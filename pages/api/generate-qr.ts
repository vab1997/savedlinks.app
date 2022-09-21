import { NextRequest } from 'next/server'
import qr from 'qrcode'

export default async (req: NextRequest) => {
  // console.log(req.nextUrl.searchParams.get('url'))

  const url = req.nextUrl.searchParams.get('url') || 'https://nextjs.org'

  const qrImage = await qr.toString(url, {
    type: 'svg',
    color: {
      light: '#3685FF',
      dark: '#ffffff'
    }
  })

  const response = new Response(JSON.stringify({ svg: qrImage }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers': '*'
    }
  })

  return response
}

export const config = {
  runtime: 'experimental-edge'
}
