import { useEffect, useState } from 'react'
import { supabase } from 'lib/supabaseClient'
import { Folder } from 'types/interfaces'

export default function useUpdateFolder ({ folders }: { folders: Folder[] }) {
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

  return { timelineFolders }
}
