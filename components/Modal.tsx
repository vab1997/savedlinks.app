import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Link } from 'types/interfaces'

export default function Modal ({ link }: { link: Link['link'] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [SvgQrCode, setSvgQrCode] = useState('')
  const urlEnv = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://savedlinks.vercel.app'

  function closeModal () {
    setIsOpen(false)
  }

  const fetchQrCode = async () => {
    setIsOpen(true)
    await fetch(`${urlEnv}/api/generate-qr?url=${link}`)
      .then((res) => res.json())
      .then((data) => {
        const { svg } = data
        setSvgQrCode(svg)
      })
  }

  return (
    <>
      <div className="flex items-center justify-center px-1">
        <button
          type="button"
          onClick={fetchQrCode}
          className="rounded-md bg-black bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-slate-300 hover:text-black"
        >
          QR
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[101]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex items-center justify-center flex-col w-full max-w-sm transform overflow-hidden rounded-2xl bg-black p-4 text-left text-white align-middle shadow-xl transition-all border border-slate-600">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Code QR
                  </Dialog.Title>
                  <div className="w-80 p-4">
                    {SvgQrCode && (
                      <div
                        className='bg-[#3685FF] rounded-lg overflow-hidden p-4 w-[288px] h-[288px]'
                        dangerouslySetInnerHTML={{ __html: SvgQrCode }}
                      />
                    )}
                  </div>

                  <div className="mt-1">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
