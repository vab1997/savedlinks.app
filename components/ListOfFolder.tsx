import { Fragment, useEffect, useState } from 'react'
import ArticleLink from 'components/ArticleLink'
import { Menu, Transition } from '@headlessui/react'
import { Link as LinkType } from 'types/interfaces'
import { supabase } from 'lib/supabaseClient'
import Link from 'next/link'
import IconFolder from './icons/IconFolder'
import useUser from 'hooks/useUser'

type FolderWihtLinks = {
  id: string
  id_user: string
  name: string
  links: LinkType[]
}

export default function ListOfFolder ({ linksForFolder }: { linksForFolder: FolderWihtLinks[] }) {
  const [timelineLinks, setTimelineLinks] = useState<typeof linksForFolder>(linksForFolder)
  const { user } = useUser()

  const updatetimelineLinks = ({ newRecord }: { newRecord: LinkType }) => {
    const newTimeline = timelineLinks.map((folder) => {
      if (folder.id !== newRecord.id_folder) return folder
      return { ...folder, links: [...folder.links, newRecord] }
    })
    setTimelineLinks(newTimeline)
  }

  const updateChekRead = ({ newRecord }: { newRecord: LinkType }) => {
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
    setTimelineLinks(newTimeLineUpdate)
  }

  useEffect(() => {
    const subscritpion = supabase
      .channel('public:links')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'links' },
        (payload: any) => {
          updatetimelineLinks({ newRecord: payload.new })
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'links' },
        (payload: any) => {
          updateChekRead({ newRecord: payload.new })
          console.log(payload)
        }
      )
      .subscribe()

    return () => {
      subscritpion.unsubscribe()
    }
  }, [timelineLinks])

  if (timelineLinks.length === 0) {
    return (
      <>
        <Link href={`/manage-folder/${user?.id}`}>
          <a className='flex items-center justify-center py-3 px-4 mt-6 space-x-4 w-full max-w-[400px] border border-slate-200 rounded-lg text-gray-200 bg-transparent hover:bg-white hover:text-black'>
            <p className='pl-4 text-sm font-normal'>
              There haven't folder so far. Create folder
            </p>
            <IconFolder />
          </a>
        </Link>
      </>
    )
  }

  return (
    <div className='flex flex-col w-full gap-3 px-3 h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-md'>
      {timelineLinks && timelineLinks.map(({ id, name, links }) => (
        <Menu key={id} as="div" className="relative mb-3 inline-block text-center w-full">
          <div>
            <Menu.Button
              className="inline-flex w-full items-center justify-center gap-2 border transition duration-100 ease-in-out hover:text-black hover:bg-slate-300 bg-black text-white border-slate-600 font-medium rounded-lg text-sm px-4 py-1.5"
            >
              <svg width="24" height="24" fill="none"><path d="m15.385 7.39-2.477-2.475A3.121 3.121 0 0 0 10.698 4H4.126A2.125 2.125 0 0 0 2 6.125V13.5h28v-3.363a2.125 2.125 0 0 0-2.125-2.125H16.887a2.126 2.126 0 0 1-1.502-.621Z" fill="#FFB02E"/><path d="M27.875 30H4.125A2.118 2.118 0 0 1 2 27.888V13.112C2 11.945 2.951 11 4.125 11h23.75c1.174 0 2.125.945 2.125 2.112v14.776A2.118 2.118 0 0 1 27.875 30Z" fill="#FCD53F"/></svg>
              {name}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute border border-slate-700 z-[100] mt-2 px-2 w-full max-h-72 overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-md py-2 divide-y bg-black divide-gray-100 rounded-md shadow-lg">
              <div className="px-1">
                {links.length === 0 &&
                  <Menu.Item>
                    <p className="text-sm text-gray-300">There haven't links so far</p>
                  </Menu.Item>
                }
                {links.map(({ id, link, description, read }) => (
                  <Menu.Item key={id}>
                    <ArticleLink
                      idLink={id}
                      link={link}
                      description={description}
                      read={read}
                    />
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ))}
    </div>
  )
}
