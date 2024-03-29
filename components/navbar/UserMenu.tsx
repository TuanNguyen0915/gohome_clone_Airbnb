"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import { useRegisterModel } from "@/hooks/useRegisterModal"
import { useLoginModal } from "@/hooks/useLoginModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useRentModal } from "@/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface IUserMenuProps {
  currentUser?: User | null
}

const UserMenu = ({ currentUser }: IUserMenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModel()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  //*******************************RETURN*******************************/
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 lg:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
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
                <MenuItem
                  onClick={() => {
                    router.push("/trips")
                    toggleOpen()
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites")
                    toggleOpen()
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations")
                    toggleOpen()
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties")
                    toggleOpen()
                  }}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => {
                    rentModal.onOpen()
                    toggleOpen()
                  }}
                  label="Airbnb my home"
                />
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
                    toggleOpen()
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen()
                    toggleOpen()
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
