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

export async function updateReadLink ({ idLink, read }: { idLink: Link['id'], read: Link['read'] }) {
  const { data } = await supabase
    .from('links')
    .update({ read })
    .eq('id', idLink)

  return data
}

export async function deleteFolder ({ id_folder }: { id_folder: Folder['id'] }) {
  const { error } = await supabase
    .from('folders')
    .delete()
    .match({ id: id_folder })

  return error
}

export async function deleteLink ({ id_link }: { id_link: Link['id'] }) {
  const { error } = await supabase
    .from('links')
    .delete()
    .match({ id: id_link })

  return error
}
