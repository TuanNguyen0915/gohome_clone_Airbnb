"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useState } from "react"
import MenuItem from "./MenuItem"
import { useRegisterModel } from "@/hooks/useRegisterModal"

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModel()
  //*******************************RETURN*******************************/
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 lg:block"
        >
          Go home
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="flexCenter cursor-pointer gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden lg:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-[50vw] overflow-hidden rounded-xl bg-slate-50 text-sm shadow-md lg:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <MenuItem onClick={() => {}} label="Login" />
            <MenuItem
              onClick={() => {
                registerModal.onOpen()
              }}
              label="Sign Up"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
