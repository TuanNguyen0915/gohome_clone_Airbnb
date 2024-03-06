"use client"
import { categories } from "@/constants"
import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useMemo, useState } from "react"
import Container from "../Shares/Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"
import { useLoginModal } from "@/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import toast from "react-hot-toast"
import axios from "axios"
import ListingReservation from "./ListingReservation"
import { Range } from "react-date-range"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}

interface IListingDetailsProps {
  listing: Listing & {
    user: User
  }
  reservations?: Reservation[]
  currentUser?: User | null
}

const ListingDetails = ({
  listing,
  reservations,
  currentUser,
}: IListingDetailsProps) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range]
    })
    return dates
  }, [reservations])

  //MAKE RESERVATION: line 52-92
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const onCreateReservation = useCallback(async () => {
    try {
      if (!currentUser) {
        return loginModal.onOpen()
      }
      setIsLoading(true)
      await axios
        .post(`/api/reservations`, {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing.id,
        })
        .then(() => {
          toast.success("Set reservation success")
          setDateRange(initialDateRange)
        })
        .finally(() => {
          setIsLoading(false)
          router.push("/trips")
        })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }, [currentUser, loginModal, totalPrice, dateRange, listing, router])

  useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )
      if (dayCount && listing.price) {
        setTotalPrice((dayCount + 1) * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [listing.price, dateRange])

  //RETURN
  return (
    <Container>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
        {/* mt-6 grid grid-cols-1 md:grid-cols-6 md:gap-10 */}
        <div className="mt-6 flex max-md:flex-col-reverse md:gap-10">
          <div className="flex w-full">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
          <div className="mb-10 w-full">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value: any) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingDetails
