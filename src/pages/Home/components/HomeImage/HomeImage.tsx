interface Props {
  image: string
  content: string
}

export default function HomeImage({ image, content }: Props) {
  return (
    <section
      className='h-[750px] bg-cover bg-center bg-fixed flex items-center justify-center'
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className='text-4xl font-bold px-52 text-center text-white drop-shadow-lg'>{content}</h2>
    </section>
  )
}
