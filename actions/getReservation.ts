import prisma from "@/libs/prismadb"

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params
    const query: any = {}
    if (listingId) {
      query.listingId = listingId
    }
    if (userId) {
      query.userId = userId
    }
    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        startDate: "asc",
      },
    })
    return reservations
    
  } catch (error: any) {
    throw new Error(error)
  }
}
