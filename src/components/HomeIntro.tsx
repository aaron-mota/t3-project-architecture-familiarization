import React from 'react'

export default function HomeIntro() {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
      </h1>
      <h2 className="text-5l font-extrabold tracking-tight text-white sm:text-[2rem] text-center">
        Aaron's first time using:
        <br />
        TypeScript, NextJS, tRPC/RQ/zod, Prisma
        <br />
        ...all at once 😅
      </h2>
      <h2 className="text-5l font-extrabold tracking-tight text-white sm:text-[1.5rem] text-center">
        Additionally using MUI (vs Chakra)
        <br />
        since I have experience with it and have limited time
      </h2>
    </>
  )
}
