import Link from 'next/link'

export default function BackToMenu () {
  return (
    <Link href='/'>
      <a
        className='absolute flex items-center justify-center text-white font-bold gap-x-2 top-5 left-0 right-0 hover:underline hover:text-slate-200 sm:left-4 sm:right-auto'
      >
        <svg className='w-10 h-10 text-white' viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'></circle><path d='m12 8-4 4 4 4M16 12H8'></path></svg>
        Back to home
      </a>
    </Link>
  )
}
