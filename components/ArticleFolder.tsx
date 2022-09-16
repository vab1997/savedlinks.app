import { supabase } from 'lib/supabaseClient'
import { useEffect, useState } from 'react'
import { Folder } from 'types/interfaces'

export default function ArticleFolder ({ folders }: { folders: Folder[] }) {
  const [timelineFolders, setTimelineFolders] = useState<Folder[]>(folders)

  useEffect(() => {
    const subscritpion = supabase
      .channel('public:folders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        (payload: any) => {
          const newTimeLineFolders = [...timelineFolders, payload.new]
          setTimelineFolders(newTimeLineFolders)
        }
      )
      .subscribe()

    return () => {
      subscritpion.unsubscribe()
    }
  }, [timelineFolders])

  return (
    <div className='flex flex-col w-full gap-3 px-3 max-h-[450px] overflow-auto'>
      {timelineFolders.map(({ name, id }) => (
        <article
          key={id}
          className='inline-flex w-full items-center justify-center gap-2 border transition duration-100 ease-in-out bg-black text-white border-slate-600 font-medium rounded-lg text-sm px-4 py-1.5'
        >
          <svg width='24' height='24' fill='none'><path d='m15.385 7.39-2.477-2.475A3.121 3.121 0 0 0 10.698 4H4.126A2.125 2.125 0 0 0 2 6.125V13.5h28v-3.363a2.125 2.125 0 0 0-2.125-2.125H16.887a2.126 2.126 0 0 1-1.502-.621Z' fill='#FFB02E'></path><path d='M27.875 30H4.125A2.118 2.118 0 0 1 2 27.888V13.112C2 11.945 2.951 11 4.125 11h23.75c1.174 0 2.125.945 2.125 2.112v14.776A2.118 2.118 0 0 1 27.875 30Z' fill='#FCD53F'></path></svg>
          {name}
        </article>
      ))}
    </div>
  )
}
