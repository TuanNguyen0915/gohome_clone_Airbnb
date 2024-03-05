"use client"
import { IconType } from "react-icons"

interface IButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disable?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}
const Button = ({
  label,
  onClick,
  disable,
  outline,
  small,
  icon: Icon,
}: IButtonProps) => {

  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`
      relative w-full rounded-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 
      ${outline ? "border-black bg-white text-black" : "border-rose-500 bg-rose-500 text-white"} 
      ${small ? "border-[1px] py-1 text-sm font-light" : "text-md border-2 py-3 font-semibold"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

export default Button
