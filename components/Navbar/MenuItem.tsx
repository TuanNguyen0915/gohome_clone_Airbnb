"use client"

interface IMenuItemProps {
  onClick: () => void
  label: string
}
const MenuItem: React.FC<IMenuItemProps> = ({ onClick, label }) => {
  return <div
  onClick={onClick}
  className="px-4 py-4 hover:bg-neutral-200 transition font-semibold"  
  >{label}</div>
}

export default MenuItem
