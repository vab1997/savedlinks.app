import { getFolders, getLinks } from 'service/clientService'
import { Folder, Link } from 'types/interfaces'
import ListOfFolder from 'components/ListOfFolder'
import FormLink from 'components/FormLink'
import BackToMenu from 'components/BackToMenu'

type FolderWihtLinks = {
  id: string
  id_user: string
  name: string
  links: Link[]
}

export default function ManageLink ({ linksForFolder = [], folders }: { linksForFolder: FolderWihtLinks[], folders: Folder[] }) {
  return (
    <section className='py-4'>
      <BackToMenu />
      <div className="flex justify-between flex-col-reverse w-full p-4 lg:flex-row">

        <div className='flex items-center justify-center flex-col gap-4 w-full mt-6 px-4 mt:mt-0'>
          <h1 className="text-white text-3xl font-medium">List links</h1>
          <ListOfFolder linksForFolder={linksForFolder} />
        </div>

        <div className='flex flex-col gap-4 w-full px-4'>
          <h1 className="text-white text-center text-3xl mb-4 font-medium">Create link</h1>
          <FormLink folders={folders} />
        </div>

      </div>
    </section>
  )
}

export async function getServerSideProps ({ query }: { query: { id: string } }) {
  const userId = query.id
  const [links, folders] = await Promise.all([
    getLinks({ userId }),
    getFolders({ userId })
  ])

  const linksForFolder = folders.map(folder => {
    const linksForFolder = links.filter(link => link.id_folder === folder.id)
    return { ...folder, links: linksForFolder }
  })

  return {
    props: {
      linksForFolder,
      folders
    }
  }
}
