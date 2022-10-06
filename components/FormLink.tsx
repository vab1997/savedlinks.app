import useUser from 'hooks/useUser'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { createLink } from 'service/clientService'
import { Folder } from 'types/interfaces'

type FormData = {
  link: string;
  description: string;
  id_folder: string;
};

export default function FormLink ({ folders }: { folders: Folder[] }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { user } = useUser()

  const onSubmitCreateLink: any = async (
    data: { link: any; description: any; id_folder: any }, event: { target: { reset: () => void } }) => {
    const { link, description, id_folder } = data
    if (!user || user === undefined) return console.log('no user')
    const id_user = user.id

    await createLink({ link, description, id_user, id_folder })

    event.target.reset()

    toast.success('created link successfully!')
  }

  if (folders.length === 0) return <p className='text-white font-medium text-center text-lg'>¡You have to create a folder!</p>

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <form onSubmit={handleSubmit(onSubmitCreateLink)} className='w-full'>
        <div className='relative z-0 mb-4 w-full px-6'>
          <input
            type='text'
            {...register('link', { required: 'Invalid URL', pattern: { value: /^https?:\/\//gm, message: 'Invalid URL' } })}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
            placeholder=' '
          />
          <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>URL</label>
          {errors.link && <p className="mt-2 text-sm font-bold text-red-500">{errors.link.message}</p>}
        </div>
        <div className='relative z-0 mb-4 w-full px-6'>
          <input
            type='text'
            {...register('description', { required: 'Description is required' })}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
            placeholder=' '
          />
          <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Description</label>
          {errors.description && <p className="mt-2 text-sm font-bold text-red-500">{errors.description.message}</p>}
        </div>
        <div className='relative z-0 mb-4 w-full px-6'>
          <label className='sr-only'>Underline select</label>
          <select
            {...register('id_folder', { required: true })}
            defaultValue={folders[0].id}
            className='block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-gray-400 border-gray-600 focus:outline-none peer'
          >
            {folders.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          {errors.id_folder && <p className="mt-2 text-sm font-bold text-red-500">This fiel is required</p>}
        </div>
        <div className='relative flex justify-end z-0 mb-4 w-full px-6'>
          <button
            type='submit'
            className='text-white cursor-default bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
          >Create link
          </button>
        </div>
      </form>
    </div>
  )
}
