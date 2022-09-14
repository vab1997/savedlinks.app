import useUser from "hooks/useUser"
import ButtonManage from "./ButtonManage"
import IconFolder from "./icons/IconFolder"
import IconLink from "./icons/IconLink"

export default function NavManage() {
  const user = useUser()

  return (
    <>
      {user && (
        <div className='flex flex-col gap-2'>
          <ButtonManage route={'/'}>
            <IconLink />
            Manage links
          </ButtonManage>
          <ButtonManage route={'/'}>
            <IconFolder />
            Manage folders
          </ButtonManage>
        </div>
      )}
    </>
  )
}