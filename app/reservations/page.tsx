import { getCurrentUser } from "@/actions/getCurrentUser"
import { getReservations } from "@/actions/getReservation"
import EmptyState from "@/components/Shares/EmptyState"
import Reservations from "@/components/Reservations/Reservations"

const MyReservations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorazion" subtitle="Please login" />
  }

  const reservations = await getReservations({ authorId: currentUser.id })
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations in your properties"
      />
    )
  }
  return (
    <div className="pt-[10vh]">
      <Reservations currentUser={currentUser} reservations={reservations} />
    </div>
  )
}

export default MyReservations
