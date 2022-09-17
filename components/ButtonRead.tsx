import { useState } from 'react'
import { updateReadLink } from 'service/clientService'
import { Link } from 'types/interfaces'
import IconCheck from './icons/IconCheck'
import IconCross from './icons/IconCross'

const InfoButton = {
  read: {
    svg: IconCheck,
    title: 'Mark as read'
  },
  noRead: {
    svg: IconCross,
    title: 'Mark as unread'
  }
}

// eslint-disable-next-line no-undef
export function ButtonCheckRead ({ children, onClick, title }: { children: React.ReactNode, onClick: () => void, title: string }) {
  return (
    <button title={title} onClick={onClick}>
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

  const svgButton = read ? InfoButton.read : InfoButton.noRead

  return (
    <span>
      <ButtonCheckRead title={svgButton.title} onClick={updateCheckRead}>
        <svgButton.svg />
      </ButtonCheckRead>
    </span>
  )
}
