import { getCurrentUser } from "@/actions/getCurrentUser"
import { getReservations } from "@/actions/getReservation"
import EmptyState from "@/components/shares/EmptyState"
import Trips from "@/components/trips/Trips"

const MyTrips = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <EmptyState title="Unauthorazion" subtitle="Please login" />
  }

  const reservations = await getReservations({ userId: currentUser.id })
  if (reservations.length < 1) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    )
  }

  return (
    <div className="pt-[10vh]">
      <Trips currentUser={currentUser} reservations={reservations} />
    </div>
  )
}

export default MyTrips
