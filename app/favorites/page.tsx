import { getCurrentUser } from "@/actions/getCurrentUser"
import { getFavorites } from "@/actions/getFavorites"
import EmptyState from "@/components/shares/EmptyState"
import Favorites from "@/components/favorites/Favorites"

const MyFavorites = async () => {
  const currentUser = await getCurrentUser()
  const favorites = await getFavorites()
  if (!currentUser) {
    return <EmptyState title="Unauthorazion" subtitle="Please login" />
  }
  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you haven't like anything"
      />
    )
  }
  return (
    <div className="pt-[10vh]">
      <Favorites currentUser={currentUser} favorites={favorites} />
    </div>
  )
}

export default MyFavorites
