import { supabase } from 'lib/supabaseClient'

export async function loginGoogle () {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  console.error(error)
}

export async function loginGithub () {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
  console.error(error)
}

export async function logoutSession () {
  const { error } = await supabase.auth.signOut()
  console.error(error)
}
