import { Listing, User } from "@prisma/client"
import Container from "../Shares/Container"
import Heading from "../Shares/Heading"
import ListingCard from "../Listings/ListingCard"

interface IFavoritesProps {
  currentUser?: User | null
  favorites: Listing[]
}

const Favorites = ({ currentUser, favorites }: IFavoritesProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="The places you like" />
      <div className="gridSizes">
        {favorites.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Favorites
