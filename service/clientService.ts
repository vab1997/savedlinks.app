import { supabase } from "lib/supabaseClient"
import { Folder, Link } from "types/interfaces"

export async function getLinks() {
  const { data: links } = await supabase
    .from('links')
    .select('*')

  return links as Link[]
}

export async function getFolders() {
  const { data: links } = await supabase
    .from('folders')
    .select('*')

  return links as Folder[]
}

export async function createLink({ link, description, id_user, id_folder }
  : { link: Link['link'], description: Link['description'], id_user: Link['id_user'], id_folder: Link['id_folder'] })
{
  const { data } = await supabase
    .from('links')
    .insert({ link, description, id_user, id_folder })

  return data
}