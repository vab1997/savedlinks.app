import { getFolders } from 'service/clientService'
import { Folder } from 'types/interfaces'
import BackToMenu from 'components/BackToMenu'
import FormFolder from 'components/FormFolder'
import ArticleFolder from 'components/ArticleFolder'

export default function ManageLink ({ folders }: { folders: Folder[] }) {
  return (
    <section className='py-4'>
      <BackToMenu />
      <div className='flex justify-between flex-col-reverse w-full p-4 lg:flex-row'>

        <div className='flex items-center justify-center flex-col gap-4 w-full mt-6 px-4 md:mt-0'>
          <h1 className='text-white text-3xl font-medium'>List folders</h1>
          <ArticleFolder folders={folders} />
        </div>

        <div className='flex flex-col gap-4 w-full px-4'>
          <h1 className='text-white text-center text-3xl mb-4 font-medium'>Create folder</h1>
          <FormFolder />
        </div>

      </div>
    </section>
  )
}

export async function getStaticProps () {
  const folders = await getFolders()

  return {
    props: {
      folders
    }
  }
}
