"use client"

import { Listing, Reservation, User } from "@prisma/client"
import Container from "../Container"
import Heading from "../Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../listings/ListingCard"

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
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
