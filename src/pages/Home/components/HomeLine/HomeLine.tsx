function HomeLine() {
  return (
    <div className='relative w-full h-[4px]  overflow-hidden rounded-full'>
      <div
        className='absolute inset-0 bg-[linear-gradient(90deg,transparent,theme(colors.teal.400),theme(colors.cyan.400),theme(colors.emerald.400),transparent)]
         bg-[length:200%_100%] animate-electricity'
      ></div>
    </div>
  )
}

export default HomeLine
