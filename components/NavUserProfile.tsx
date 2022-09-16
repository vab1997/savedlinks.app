import { Fragment } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import ChevronIcon from 'components/icons/IconChevron'

import { logoutSession } from 'service/login'
import { User } from 'types/interfaces'

export default function NavUserProfile ({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center text-sm rounded-full hover:opacity-70">
          <Image
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
            src={user?.avatar ?? ''}
            alt=""
          />
          <span className="ml-2 font-semibold text-white">{user?.name}</span>
          <ChevronIcon fill='#fff'/>
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
        <Menu.Items className="absolute right-0 z-10 block mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <>
                <button
                  onClick={logoutSession}
                  className={`${
                    !active ? 'hover:bg-yellow-300 rounded-md' : ''
                  } group flex gap-1 items-center w-full px-4 py-2 text-sm text-gray-900 font-semibold`}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                    <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                  </svg>
                  Cerrar sessión
                </button>
              </>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
