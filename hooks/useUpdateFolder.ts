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
        { event: 'INSERT', schema: 'public', table: 'folders' },
        (payload: any) => {
          const newTimeLineFolders = [...timelineFolders, payload.new]
          setTimelineFolders(newTimeLineFolders)
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'folders' },
        (payload: any) => {
          const newTimeLineFolders = timelineFolders.filter(folder => folder.id !== payload.old.id)
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
