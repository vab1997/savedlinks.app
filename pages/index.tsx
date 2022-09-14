import NavManage from "components/NavManage"
import NavUserOutlet from "components/NavUserOutlet"
import Image from "next/image"
import linkImage from "public/link.webp"

export default function Home () {
  return (
    <div className='flex justify-center items-center p-6 md:text-left'>
      <section className='flex justify-center items-center flex-col gap-4'>
        <h1 className='flex gap-2 items-center justify-center font-medium text-white text-4xl'>
          Welcome to savedlinks
          <Image
            src={linkImage}
            width={48}
            height={48}
            alt='savedlinks logo'
          />
        </h1>
        <NavUserOutlet />
        <NavManage />
      </section>
    </div>
  )
}
