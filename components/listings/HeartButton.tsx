"use client"

import { User } from "@prisma/client"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface IHeartButtonProps {
  listingId: string
  currentUser?: User | null
}

const HeartButton = ({ listingId, currentUser }: IHeartButtonProps) => {
  const hasFavorite = false
  const toggleFavorite = () => {}

  return (
    <div
      className="flexCenter relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart size={30} className="absolute fill-white" />
      <AiFillHeart
        size={28}
        className={`absolute ${hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  )
}

export default HeartButton
