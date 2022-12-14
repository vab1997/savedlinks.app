import Head from 'next/head'
import Image from 'next/image'
import linkImage from 'public/link.webp'

type Props = {
  title?: string,
  description?: string,
  // eslint-disable-next-line no-undef
  children?: React.ReactNode,
  image?: string,
}

export default function Layout ({
  children,
  title = 'Saved Links | A simple link saving app',
  description = 'site web for save links in folders'
}: Props) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='https://savedlinks.vercel.app' />

        <meta property='og:url' content='https://savedlinks.vercel.app' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content='https://savedlinks.vercel.app/link.webp' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@victorbejas' />
        <meta name='twitter:domain' content='https://twitter.com/victorbejas' />
        <meta name='twitter:site' content='@victorbejas' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
      </Head>
      <main className='flex place-content-center'>
        <div className='container py-14 px-4 md:py-4'>
          <h1 className='block items-center justify-center gap-2 text-center mt-4 sm:mt-0 font-medium text-white text-4xl sm:flex lg:text-5xl'>
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
