import { useState } from 'react'
import { updateReadLink } from 'service/clientService'
import { Link } from 'types/interfaces'

// eslint-disable-next-line no-undef
export function ButtonCheckRead ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default function ButtonRead ({ idLink, read }: { idLink: Link['id'], read: Link['read'] }) {
  const [isRead, setIsRead] = useState<Link['read']>(read)

  const updateCheckRead = async () => {
    setIsRead(!isRead)
    await updateReadLink({ idLink, read: !read })
  }

  return (
    <span>
      {isRead
        ? (
          <ButtonCheckRead onClick={() => updateCheckRead()}>
            <svg width="30" height="30" fill="none"><path d="M2 6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6Z" fill="#00D26A"/><path d="M13.242 23c-.383 0-.766-.143-1.059-.43l-5.744-5.642a1.453 1.453 0 0 1 0-2.08 1.517 1.517 0 0 1 2.118 0l4.685 4.601L23.443 9.431a1.517 1.517 0 0 1 2.118 0 1.452 1.452 0 0 1 0 2.08l-11.26 11.058c-.292.288-.676.431-1.059.431Z" fill="#F4F4F4"/></svg>
          </ButtonCheckRead>
          )
        : (
          <ButtonCheckRead onClick={() => updateCheckRead()}>
            <svg width="30" height="30" fill="none"><path d="M24.879 2.879A3 3 0 1 1 29.12 7.12l-8.79 8.79a.125.125 0 0 0 0 .177l8.79 8.79a3 3 0 1 1-4.242 4.243l-8.79-8.79a.125.125 0 0 0-.177 0l-8.79 8.79a3 3 0 1 1-4.243-4.242l8.79-8.79a.125.125 0 0 0 0-.177l-8.79-8.79A3 3 0 0 1 7.12 2.878l8.79 8.79a.125.125 0 0 0 .177 0l8.79-8.79Z" fill="#F92F60"/></svg>
          </ButtonCheckRead>
          )
      }
    </span>
  )
}
