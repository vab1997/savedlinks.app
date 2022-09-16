export interface User {
  id: string,
  avatar: string,
  name: string,
  email: string
}

export interface Link {
  id: string,
  link: string,
  description: string,
  read: boolean,
  id_user: string,
  id_folder: string
}

export interface Folder {
  id: string,
  id_user: string,
  name: string
}