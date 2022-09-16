import IconLoading from 'components/icons/IconLoading'
import LoginButton from 'components/LoginButton'
import NavUserProfile from 'components/NavUserProfile'
import useUser from 'hooks/useUser'
import cookies from 'js-cookie'

export default function NavUserOutlet () {
  const { user, loading } = useUser()

  if (loading) return <IconLoading />
  if (user) {
    cookies.set('userId', user.id)
    return <NavUserProfile user={user} />
  }
  if (!user) return <LoginButton />

  return null
}
