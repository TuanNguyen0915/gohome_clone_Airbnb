import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import RegisterModal from "@/components/modal/RegisterModal"
import { Toaster } from "react-hot-toast"
import LoginModal from "@/components/modal/LoginModal"
import { getCurrentUser } from "@/actions/getCurrentUser"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "goHome",
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
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  )
}
