import { IconType } from "react-icons"

interface ICategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const CategoryInput = ({
  icon: Icon,
  label,
  onClick,
  selected,
}: ICategoryInputProps) => {
  return (
    <div
      className={`flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition hover:border-black md:gap-4 
      ${selected ? "border-black" : "border-neutral-200"}`}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </div>
  )
}

export default CategoryInput
