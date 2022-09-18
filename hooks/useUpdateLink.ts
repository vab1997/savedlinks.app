import { supabase } from 'lib/supabaseClient'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link as LinkType } from 'types/interfaces'

type FolderWihtLinks = {
  id: string
  id_user: string
  name: string
  links: LinkType[]
}

const updatetimelineLinks = ({ timelineLinks, newRecord }: { timelineLinks: FolderWihtLinks[], newRecord: LinkType }) => {
  const newTimeline = timelineLinks.map((folder) => {
    if (folder.id !== newRecord.id_folder) return folder
    return { ...folder, links: [...folder.links, newRecord] }
  })

  return newTimeline
}

const updateChekRead = ({ timelineLinks, newRecord }: { timelineLinks: FolderWihtLinks[], newRecord: LinkType }) => {
  const newTimeLineUpdate = timelineLinks.map((folder) => {
    if (folder.id !== newRecord.id_folder) return folder
    return {
      ...folder,
      // eslint-disable-next-line array-callback-return
      links: [...folder.links.map((link) => {
        if (link.id !== newRecord.id) return link
        return { ...link, read: newRecord.read }
      })]
    }
  })

  return newTimeLineUpdate
}

export default function useUpdateLink ({ linksForFolder }: { linksForFolder: FolderWihtLinks[] }) {
  const [timelineLinks, setTimelineLinks] = useState<typeof linksForFolder>(linksForFolder)

  useEffect(() => {
    const subscritpion = supabase
      .channel('public:links')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'links' },
        (payload: any) => {
          const newTimeLineInsert = updatetimelineLinks({ timelineLinks, newRecord: payload.new })
          setTimelineLinks(newTimeLineInsert)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'links' },
        (payload: any) => {
          const newTimeLineUpdate = updateChekRead({ timelineLinks, newRecord: payload.new })
          setTimelineLinks(newTimeLineUpdate)
          toast.success('Update link successfully!')
        }
      )
      .subscribe()

    return () => {
      subscritpion.unsubscribe()
    }
  }, [timelineLinks])

  return { timelineLinks }
}
