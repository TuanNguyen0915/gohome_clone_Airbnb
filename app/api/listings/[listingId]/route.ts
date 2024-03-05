import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
  listingId?: string
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error()
  }
  // make sure just delete by the author
  const listing = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
