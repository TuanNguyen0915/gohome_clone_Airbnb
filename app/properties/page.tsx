import { getCurrentUser } from "@/actions/getCurrentUser"
import { getListings } from "@/actions/getListings"
import EmptyState from "@/components/Shares/EmptyState"
import Properties from "@/components/Properties/Properties"

const MyProperties = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <EmptyState title="Unauthorazion" subtitle="Please login" />
  }
  const properties = await getListings({ userId: currentUser.id })
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you post your Properties"
      />
    )
  }

  return (
    <div className="pt-[10vh]">
      <Properties currentUser={currentUser} properties={properties} />
    </div>
  )
}

export default MyProperties
