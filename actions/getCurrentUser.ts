import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/libs/prismadb"

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      },
    })

    if(!currentUser) {
      return null
    }
    return currentUser
  } catch (error: any) {
    return null
  }
}
