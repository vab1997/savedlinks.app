import { useState, useEffect } from 'react'
import { supabase } from 'lib/supabaseClient'
import { User } from 'types/interfaces'

const extractInfoFrom = (rowUser: any): User | null => {
  const userData = rowUser?.identities?.[0].identity_data
  if (!userData) return null

  const idUser: string = rowUser?.id
  const { email, name, avatar_url: avatar } = userData
  return { avatar, email, name, id: idUser }
}

export default function useUser () {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserSup = async () => {
      const rowUser = await supabase.auth.getUser()
      const rawUser = rowUser.data.user
      if (!rawUser) return null

      const userData = extractInfoFrom(rawUser)
      setUser(userData)
    }

    getUserSup()

    const { data: listener } = supabase.auth.onAuthStateChange((even, session) => {
      const newUser = extractInfoFrom(session?.user)
      setUser(newUser)
    })

    if (!user || user === null) setLoading(!loading)

    return () => listener?.subscription.unsubscribe()
  }, [])

  return { user, loading }
}
