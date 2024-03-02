import React from "react"

interface IContainer {
  children: React.ReactNode
  isNavbar?: boolean
}

const Container = ({ children, isNavbar }: IContainer) => {
  return (
    <div
      className={`mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20 ${isNavbar && "rounded-lg border-b-2 border-rose-500 py-4"}`}
    >
      {children}
    </div>
  )
}

export default Container
