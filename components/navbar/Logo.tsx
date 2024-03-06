"use client"
import { SiAirbnb } from "react-icons/si"
import Image from "next/image"
import { useRouter } from "next/navigation"
const Logo = () => {
  const router = useRouter()
  return (
    <SiAirbnb
      size={60}
      className="hidden cursor-pointer text-rose-500 lg:block"
      onClick={() => router.push("/")}
    />
  )
}

export default Logo
