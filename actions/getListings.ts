import prisma from "@/libs/prismadb"

export const getListings = async () => {
  try {
    const allListings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return allListings
  } catch (error: any) {
    throw new Error(error)
  }
}
