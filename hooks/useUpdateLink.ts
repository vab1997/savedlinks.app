import { useEffect, useState } from 'react'
import { Link as LinkType } from 'types/interfaces'
import toast from 'react-hot-toast'
import { supabase } from 'lib/supabaseClient'

type FolderWihtLinks = {
  id: string
  id_user: string
  name: string
  links: LinkType[]
}

type PayloadTypes = {
  commit_timestamp: string
  errors: string[]
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: LinkType
  old: { id: string }
  schema: string
  table: string
}

const updatetimelineLinks = ({ timelineLinks, recordResponse }: { timelineLinks: FolderWihtLinks[], recordResponse: PayloadTypes }) => {
  const newTimeline = timelineLinks.map((folder) => {
    if (folder.id !== recordResponse.new.id_folder) return folder
    return { ...folder, links: [...folder.links, recordResponse.new] }
  })

  return newTimeline
}

const updateChekRead = ({ timelineLinks, recordResponse }: { timelineLinks: FolderWihtLinks[], recordResponse: PayloadTypes }) => {
  const newTimeLine = timelineLinks.map((folder) => {
    if (folder.id !== recordResponse.new.id_folder) return folder
    return {
      ...folder,
      // eslint-disable-next-line array-callback-return
      links: [...folder.links.map((link) => {
        if (link.id !== recordResponse.new.id) return link
        return { ...link, read: recordResponse.new.read }
      })]
    }
  })

  return newTimeLine
}

const updateTimelineDelete = ({ timelineLinks, recordResponse }: { timelineLinks: FolderWihtLinks[], recordResponse: PayloadTypes }) => {
  const newTimeLine = timelineLinks.map((folder) => {
    return {
      ...folder,
      // eslint-disable-next-line array-callback-return
      links: folder.links.filter((link) => {
        if (link.id !== recordResponse.old.id) return link
      })
    }
  })

  return newTimeLine
}

const messageToastForEvent = {
  INSERT: 'Added link successfully!',
  UPDATE: 'Update link successfully!',
  DELETE: 'Delete link successfully!'
}

const eventDataBase = {
  INSERT: updatetimelineLinks,
  UPDATE: updateChekRead,
  DELETE: updateTimelineDelete
}

export default function useUpdateLink ({ linksForFolder }: { linksForFolder: FolderWihtLinks[] }) {
  const [timelineLinks, setTimelineLinks] = useState<typeof linksForFolder>(linksForFolder)

  // the type of the payload is any, but there is an error with realtime data of supabase (type of payload is PayloadTypes)
  const updateTimeLineForEvent = (
    { timelineLinks, event, recordResponse }:
      { timelineLinks: FolderWihtLinks[], event: 'INSERT' | 'UPDATE' | 'DELETE', recordResponse: any }
  ) => {
    const methodPayloadEvent = eventDataBase[event]
    const newTimeLine = methodPayloadEvent({ timelineLinks, recordResponse })

    return newTimeLine
  }

  useEffect(() => {
    const subscritpion = supabase
      .channel('public:links')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'links' },
        (payload) => {
          const newTimeLine = updateTimeLineForEvent(
            { timelineLinks, event: payload.eventType, recordResponse: payload }
          )
          setTimelineLinks(newTimeLine)

          const messageToast = messageToastForEvent[payload.eventType]
          toast.success(messageToast)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscritpion)
    }
  }, [timelineLinks])

  return { timelineLinks }
}
