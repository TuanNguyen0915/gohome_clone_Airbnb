import prisma from "@/libs/prismadb"

export interface IParamsProps {
  userId?: string
}

export const getListings = async (params: IParamsProps) => {
  try {
    const { userId } = params
    let query: any = {}
    if (userId) {
      query.userId = userId
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
