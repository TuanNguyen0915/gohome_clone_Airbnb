import { getCurrentUser } from "@/actions/getCurrentUser"
import { getListingById } from "@/actions/getListingById"
import EmptyState from "@/components/EmptyState"
import ListingDetails from "@/components/listings/ListingDetails"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  if (!listing) {
    return (
      <EmptyState title="Something wrong" subtitle="Please refresh the page" />
    )
  }
  return (
    <div className="pt-[10vh]">
      <ListingDetails listing={listing} currentUser={currentUser} />
    </div>
  )
}

export default ListingPage
