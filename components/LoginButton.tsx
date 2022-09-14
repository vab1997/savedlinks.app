import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { loginGithub, loginGoogle } from 'service/login'
import IconGoogle from 'components/icons/IconGoogle'
import IconGithub from 'components/icons/IconGithub'
import ChevronIcon from 'components/icons/IconChevron'

export default function LoginButton () {
  return (
    <div>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="inline-flex items-center px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-400">
            <span className='text-white font-medium'>Iniciar sesión</span><ChevronIcon fill='#fff' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute right--1 z-10 block mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-40 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <>
                  <button
                    onClick={loginGithub}
                    className={`${
                      active ? 'bg-yellow-400' : ''
                    } group flex gap-2 rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 font-semibold`} >
                    <IconGithub width={20} height={20} />
                    Google
                  </button>
                  <button
                    onClick={loginGoogle}
                    className={`${
                      active ? 'bg-yellow-400' : ''
                    } group flex gap-2 rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 font-semibold`} >
                    <IconGoogle fill='#3d5a98' width={20} height={20} />
                    Google
                  </button>
                </>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}