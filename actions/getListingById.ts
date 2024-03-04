import prisma from "@/libs/prismadb"

interface IParams {
  listingId?: string
}

export const getListingById = async (params: IParams) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: true,
      },
    })
    return listing ? listing : null
  } catch (error: any) {
    throw new Error(error)
  }
}
