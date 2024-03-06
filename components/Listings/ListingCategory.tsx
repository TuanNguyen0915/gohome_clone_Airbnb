import { IconType } from "react-icons"

interface IListingCategoryProps {
  icon: IconType
  label: string
  description: string
}
const ListingCategory = ({
  icon: Icon,
  label,
  description,
}: IListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>
          <p className="font-light text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory
