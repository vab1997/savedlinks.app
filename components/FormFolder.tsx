import useUser from "hooks/useUser"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { createFolder } from "service/clientService"

type FormData = {
  nameFolder: string;
}

export default function FormFolder() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { user } = useUser()

  const onSubmitCreateLink: any = async (
    data: { nameFolder: FormData['nameFolder'] }, event: { target: { reset: () => void } }) => {
    const { nameFolder } = data
    if (!user || user === undefined) return console.log('no user')
    const id_user = user.id

    await createFolder({ name: nameFolder, id_user })

    event.target.reset()

    toast.success('created folder successfully!')
  }

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
            {...register('nameFolder', { required: true })}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
            placeholder=' '
            required
          />
          <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>name folder</label>
          {errors.nameFolder && <p className="mt-2 text-sm font-bold text-red-500">This fiel is required</p>}
        </div>
        <div className='relative z-0 mb-4 w-full px-6'>
          <button 
            type='submit' 
            className='text-white cursor-default bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
          >Create folder
          </button>
        </div>
      </form>
    </div>
  )
}