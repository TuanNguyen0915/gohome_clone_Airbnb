import { getCurrentUser } from "@/actions/getCurrentUser"
import { getListingById } from "@/actions/getListingById"
import { getReservations } from "@/actions/getReservation"
import EmptyState from "@/components/EmptyState"
import ListingDetails from "@/components/listings/ListingDetails"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)
  if (!listing) {
    return (
      <EmptyState title="Something wrong" subtitle="Please refresh the page" />
    )
  }
  return (
    <div className="pt-[10vh]">
      <ListingDetails listing={listing} currentUser={currentUser} reservations={reservations}/>
    </div>
  )
}

export default ListingPage
