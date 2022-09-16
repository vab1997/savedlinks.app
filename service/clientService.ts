import { supabase } from 'lib/supabaseClient'
import { Folder, Link, User } from 'types/interfaces'

export async function getLinks ({ userId }: { userId: User['id'] }) {
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('id_user', userId)

  return links as Link[]
}

export async function getFolders ({ userId }: { userId: User['id'] }) {
  const { data: links } = await supabase
    .from('folders')
    .select('*')
    .eq('id_user', userId)

  return links as Folder[]
}

export async function createLink ({ link, description, id_user, id_folder }
  : { link: Link['link'], description: Link['description'], id_user: Link['id_user'], id_folder: Link['id_folder'] }) {
  const { data } = await supabase
    .from('links')
    .insert({ link, description, id_user, id_folder })

  return data
}

export async function createFolder ({ name, id_user }: { name: Folder['name'], id_user: Folder['id_user'] }) {
  const { data } = await supabase
    .from('folders')
    .insert({ name, id_user })

  return data
}
