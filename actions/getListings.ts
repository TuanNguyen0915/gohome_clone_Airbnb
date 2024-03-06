import prisma from "@/libs/prismadb"

export interface IParamsProps {
  userId?: string
  roomCount?: number
  guestCount?: number
  bathroomCount?: number
  locationValue?: string
  startDate?: string
  endDate?: string
  category?: string
}

export const getListings = async (params: IParamsProps) => {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params

    let query: any = {}
    if (userId) {
      query.userId = userId
    }
    if (category) {
      query.category = category
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }
    const allListings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })
    return allListings
  } catch (error: any) {
    throw new Error(error)
  }
}
