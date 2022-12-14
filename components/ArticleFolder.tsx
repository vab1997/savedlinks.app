import useUpdateFolder from 'hooks/useUpdateFolder'
import { deleteFolder } from 'service/clientService'
import { Folder } from 'types/interfaces'

export default function ArticleFolder ({ folders }: { folders: Folder[] }) {
  const { timelineFolders } = useUpdateFolder({ folders })

  const handleDelete = ({ id }: { id: Folder['id'] }) => {
    deleteFolder({ id_folder: id })
  }

  if (timelineFolders.length === 0) {
    return (
      <div className='flex items-center justify-center py-3 px-4 mt-6 space-x-4 w-full max-w-[400px] border border-slate-200 rounded-lg text-gray-200 bg-transparent'>
        <p className='pl-4 text-sm font-normal'>
          There haven't folder so far. Create folder
        </p>
        <svg width={24} height={24} clipRule="evenodd" fillRule="evenodd" fill='#fff' strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24">
          <path d="M13.022 14.999v3.251a.751.751 0 0 0 1.27.544l6.396-6.069a.998.998 0 0 0 0-1.45l-6.396-6.068a.752.752 0 0 0-1.27.543v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fillRule="nonzero" />
        </svg>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center w-full gap-3 px-3 max-h-[450px] overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-md'>
      {timelineFolders.map(({ name, id }) => (
        <article
          key={id}
          className='inline-flex w-full items-center justify-between gap-2 border transition duration-100 ease-in-out bg-black text-white border-slate-600 font-medium rounded-lg text-sm px-6 py-2'
        >
          <div className='flex items-center justify-center gap-2'>
            <svg width='24' height='24' fill='none'><path d='m15.385 7.39-2.477-2.475A3.121 3.121 0 0 0 10.698 4H4.126A2.125 2.125 0 0 0 2 6.125V13.5h28v-3.363a2.125 2.125 0 0 0-2.125-2.125H16.887a2.126 2.126 0 0 1-1.502-.621Z' fill='#FFB02E'></path><path d='M27.875 30H4.125A2.118 2.118 0 0 1 2 27.888V13.112C2 11.945 2.951 11 4.125 11h23.75c1.174 0 2.125.945 2.125 2.112v14.776A2.118 2.118 0 0 1 27.875 30Z' fill='#FCD53F'></path></svg>
            {name}
          </div>
          <button
            onClick={() => handleDelete({ id })}
            className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-600 to-orange-400 group-hover:from-red-500 group-hover:to-orange-400 hover:text-white text-white'
          >
            <span className="relative px-2 py-0.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Delete folder
            </span>
          </button>
        </article>
      ))}
    </div>
  )
}
