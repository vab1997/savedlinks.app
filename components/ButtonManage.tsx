import Link from 'next/link'

// eslint-disable-next-line no-undef
export default function ButtonManage ({ children, route }: {children: React.ReactNode, route: string}) {
  return (
    <Link href={route}>
      <a
        className='flex items-center justify-center gap-2 border transition duration-100 ease-in-out hover:text-black hover:bg-white bg-black text-white border-slate-600 font-medium rounded-lg text-sm px-4 py-1.5'
      >
        {children}
      </a>
    </Link>
  )
}
