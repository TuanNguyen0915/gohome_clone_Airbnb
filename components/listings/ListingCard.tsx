"use client"
import useCountry from "@/hooks/useCountry"
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from "date-fns"
import Image from "next/image"
import HeartButton from "./HeartButton"
import { Span } from "next/dist/trace"
import Button from "../shares/Button"

interface IListingCardProps {
  data: Listing
  reservation?: Reservation
  currentUser?: User | null
  onAction?: (id: string) => void
  actionLabel?: string
  actionId?: string
  disabled?: boolean
}

const ListingCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  actionId = "",
  actionLabel,
  disabled,
}: IListingCardProps) => {
  const router = useRouter()
  const { getByValue } = useCountry()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) {
        return
      }
      onAction?.(actionId)
    },
    [disabled, actionId, onAction],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [data.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation])
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            alt="listing"
            fill
            src={data.imageSrc}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute right-5 top-5 z-10">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
          {reservationDate || data.category}
        </p>
        <div className="flex items-center gap-1">
          <p>$</p>
          <p>{price}</p>
          {reservation === undefined && <p>/night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
