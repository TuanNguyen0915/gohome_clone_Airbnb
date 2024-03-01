import prisma from "@/libs/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { email, password, name } = body
  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
