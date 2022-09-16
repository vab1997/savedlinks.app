import NavManage from "components/NavManage"
import NavUserOutlet from "components/NavUserOutlet"

export default function Home () {
  return (
    <div className='flex justify-center items-center p-6 md:text-left'>
      <section className='flex justify-center items-center flex-col gap-4'>
        <NavUserOutlet />
        <NavManage />
      </section>
    </div>
  )
}
