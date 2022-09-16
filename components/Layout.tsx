import Head from "next/head"
import Image from "next/image"
import linkImage from "public/link.webp"

type Props = {
  title?: string,
  description?: string,
  children?: React.ReactNode,
  image?: string,
}

export default function Layout({
  children,
  title = 'Adóptame | Adopta tu mascota',
  description = 'adoptame es una plataforma para difundir mascotas en adopción y mascotas extraviadas'
}: Props) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='https://adoptame.me' />

        <meta property='og:url' content='https://adoptame.me/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@victorbejas' />
        <meta name='twitter:domain' content='https://twitter.com/victorbejas' />
        <meta name='twitter:site' content='@victorbejas' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
      </Head>
      <main className='flex place-content-center'>
        <div className='container py-14 px-4 md:py-4'>
          <h1 className='text-center font-medium text-white text-3xl md:text-4xl'>
            Welcome to savedlinks
            <Image
              src={linkImage}
              placeholder='blur'
              width={48}
              height={48}
              alt='savedlinks logo'
            />
          </h1>
          {children}
        </div>
      </main>
    </>
  )
}