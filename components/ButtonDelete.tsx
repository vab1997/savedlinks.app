import { deleteLink } from 'service/clientService'
import { Link } from 'types/interfaces'
import IconDelete from './icons/IconDelete'

export default function ButtonDelete ({ idLink }: { idLink: Link['id'] }) {
  const handleDelete = async () => {
    await deleteLink({ id_link: idLink })
  }

  return (
    <button onClick={handleDelete} title='Delete link'>
      <IconDelete />
    </button>
  )
}
