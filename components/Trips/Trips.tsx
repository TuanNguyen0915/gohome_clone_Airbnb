"use client"

import { Listing, Reservation, User } from "@prisma/client"
import Container from "../Shares/Container"
import Heading from "../Shares/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../Listings/ListingCard"

interface ITripsProps {
  currentUser?: User | null
  reservations?: Reservation[]
}

const Trips = ({ currentUser, reservations }: ITripsProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)
      await axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled")
          router.refresh()
        })
        .catch((err) => toast.error(err?.response?.data?.error))
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="gridSizes">
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
            data={reservation.listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default Trips
