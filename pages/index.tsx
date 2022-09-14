import IconLink from "components/icons/IconLink"
import NavUserOutlet from "components/NavUserOutlet"

export default function Home () {
  return (
    <div className='flex justify-center items-center p-6 md:text-left'>
      <section className='flex justify-center items-center flex-col gap-4'>
        <h1 className='flex gap-2 items-center justify-center font-medium text-white text-4xl'>
          Welcome to savedlinks
          <IconLink />
        </h1>
        <NavUserOutlet />
      </section>
    </div>
  )
}
