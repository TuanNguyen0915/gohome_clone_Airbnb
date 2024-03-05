"use client"

import { Reservation, User } from "@prisma/client"
import Container from "../shares/Container"
import Heading from "../shares/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../listings/ListingCard"

interface IReservationsProps {
  currentUser?: User | null
  reservations: Reservation[]
}

const Reservations = ({ currentUser, reservations }: IReservationsProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")
  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)
      await axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancel")
          router.refresh()
        })
        .finally(() => setDeletingId(""))
    },
    [router],
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="gridSizes">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Reservations
