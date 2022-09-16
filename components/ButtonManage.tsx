import Link from 'next/link'

// eslint-disable-next-line no-undef
export default function ButtonManage ({ children, route }: {children: React.ReactNode, route: string}) {
  return (
    <Link href={route}>
      <a
        className='flex items-center justify-center gap-2 border border-white transition duration-100 ease-in-out text-black bg-white hover:bg-black hover:text-white hover:border-slate-600 font-medium rounded-lg text-sm px-4 py-1.5'
      >
        {children}
      </a>
    </Link>
  )
}
