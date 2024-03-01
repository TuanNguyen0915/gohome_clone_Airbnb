"use client"

import Image from "next/image"

interface IAvatarProps {
  src: string | undefined | null
}

const Avatar: React.FC<IAvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={`${src ? src : "/placeholder.jpg"}`}
    />
  )
}

export default Avatar
