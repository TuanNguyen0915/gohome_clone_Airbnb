"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useState } from "react"
import MenuItem from "./MenuItem"
import { useRegisterModel } from "@/hooks/useRegisterModal"
import { useLoginModel } from "@/hooks/useLoginModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

interface IUserMenuProps {
  currentUser?: User | null
}

const UserMenu= ({ currentUser }:IUserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModel()
  const loginModal = useLoginModel()

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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-[50vw] overflow-hidden rounded-xl bg-slate-50 text-sm shadow-md md:w-[25vw] lg:w-[10vw]">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="My properties" />
                <hr className="border-1px border-rose-500" />
                <MenuItem
                  onClick={() => {
                    signOut()
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen()
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen()
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
