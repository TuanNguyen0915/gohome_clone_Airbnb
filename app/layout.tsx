import Navbar from "@/components/Navbar/Navbar"
import LoginModal from "@/components/Modal/LoginModal"
import RegisterModal from "@/components/Modal/RegisterModal"
import RentModal from "@/components/Modal/RentModal"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { getCurrentUser } from "@/actions/getCurrentUser"
import "./globals.css"
import SearchModal from "@/components/Modal/SearchModal"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LikeYourHome",
  description: "Living anywhere like your home",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toaster position="top-center" reverseOrder={false} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pt-50 pb-20">{children}</div>
      </body>
    </html>
  )
}
