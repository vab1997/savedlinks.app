import { Link } from 'types/interfaces'
import ButtonRead from './ButtonRead'
import ButtonDelete from './ButtonDelete'
import Modal from 'components/Modal'

export default function ArticleLink ({ idLink, read, link, description }:
  { idLink: Link['id'], read: Link['read'], link: Link['link'], description: Link['description'] }) {
  return (
    <article className='flex items-center py-1.5 px-2 mt-2 space-x-2 w-full rounded-md divide-x shadow text-gray-400 divide-gray-700 space-x bg-transparent hover:bg-gray-600'>
      <div className='flex gap-2 justify-center items-center'>
        <ButtonRead
          idLink={idLink}
          read={read}
        />
        <ButtonDelete
          idLink={idLink}
        />
      </div>
      <a
        className='hover:text-white w-[150px] px-1 font-medium text-left text-white/50 truncate'
        href={link}
        target='_blank'
        rel='nofollow noreferrer'
      >
        {link}
      </a>
      <div className='pl-2 text-sm text-start font-normal truncate w-64'>{description}</div>
      <Modal link={link} />
    </article>
  )
}
