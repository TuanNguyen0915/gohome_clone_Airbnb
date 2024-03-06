import { getCurrentUser } from "@/actions/getCurrentUser"
import { IParamsProps, getListings } from "@/actions/getListings"
import Container from "@/components/shares/Container"
import EmptyState from "@/components/shares/EmptyState"
import ListingCard from "@/components/listings/ListingCard"

interface IHomeProps {
  searchParams?: IParamsProps
}

const Home = async ({ searchParams }: { searchParams: IParamsProps }) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }
  return (
    <Container>
      <div className="gridSizes pt-[20vh]">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser && currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
export default Home
