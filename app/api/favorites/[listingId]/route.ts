import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
  listingId: string
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }
    const { listingId } = params
    let favoriteIds = currentUser.favoriteIds
    // if the user does not like: push the listing ID to favorites list, remove otherwise
    if (favoriteIds.includes(listingId)) {
      favoriteIds = favoriteIds.filter((id) => id !== listingId)
    } else {
      favoriteIds.push(listingId)
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.error()
  }
}

// import { getCurrentUser } from "@/actions/getCurrentUser"
// import prisma from "@/libs/prismadb"
// import { NextResponse } from "next/server"

// interface IParams {
//   listingId?: string
// }

// export const POST = async (req: Request, { params }: { params: IParams }) => {
//   try {
//     const currentUser = await getCurrentUser()
//     if (!currentUser) {
//       return NextResponse.error()
//     }
//     const { listingId } = params
//     if (!listingId || typeof listingId !== "string") {
//       return NextResponse.error()
//     }
//     let favoriteIds = [...(currentUser.favoriteIds || [])]
//     favoriteIds.push(listingId)
//     const user = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: { favoriteIds },
//     })
//     return NextResponse.json(user)
//   } catch (error) {
//     return NextResponse.error()
//   }
// }

// export const DELETE = async (req: Request, { params }: { params: IParams }) => {
//   try {
//     const currentUser = await getCurrentUser()
//     if (!currentUser) {
//       return NextResponse.error()
//     }
//     const { listingId } = params
//     if (!listingId || typeof listingId !== "string") {
//       return NextResponse.error()
//     }
//     let favoriteIds = [...(currentUser.favoriteIds || [])]
//     favoriteIds = favoriteIds.filter((id) => id !== listingId)
//     const user = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: { favoriteIds },
//     })
//     return NextResponse.json(user)
//   } catch (error) {
//     return NextResponse.error()
//   }
// }
