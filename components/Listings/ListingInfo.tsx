"use client"

import Avatar from "@/components/Navbar/Avatar"
import useCountry from "@/hooks/useCountry"
import { User } from "@prisma/client"
import { IconType } from "react-icons"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

interface IListingInfoProps {
  user: User
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  locationValue: string
}

const ListingInfo = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  category,
  locationValue,
}: IListingInfoProps) => {
  const { getByValue } = useCountry()
  const coordinates = getByValue(locationValue)?.latlng

  const Map = dynamic(() => import("@/components/Shares/Map"), {
    ssr: false,
  })

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <p>Hosted by {user?.name}</p>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>
            {guestCount} {guestCount > 1 ? "guests" : "guest"}
          </p>
          <p>
            {roomCount} {roomCount > 1 ? "rooms" : "room"}{" "}
          </p>
          <p>
            {bathroomCount} {bathroomCount > 1 ? "bathrooms" : "bathroom"}
          </p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          description={category.description}
          label={category.label}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map latlng={coordinates} />
    </div>
  )
}

export default ListingInfo
