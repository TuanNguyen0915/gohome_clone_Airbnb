"use client"

import Heading from "@/components/Shares/Heading"
import useCountry from "@/hooks/useCountry"
import { User } from "@prisma/client"
import Image from "next/image"
import HeartButton from "./HeartButton"

interface IListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: User | null
}

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: IListingHeadProps) => {
  const { getByValue } = useCountry()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.value}, ${location?.region}`}
      />
      <div className="relative h-[40vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
