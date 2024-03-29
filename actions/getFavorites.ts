import prisma from "@/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

export const getFavorites = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return []
  }

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...(currentUser.favoriteIds || [])],
      },
    },
  })

  return favorites
}
