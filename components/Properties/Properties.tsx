"use client"
import { Listing, User } from "@prisma/client"
import Container from "../Shares/Container"
import Heading from "../Shares/Heading"
import ListingCard from "../Listings/ListingCard"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

interface IPropertiesProps {
  currentUser?: User | null
  properties: Listing[]
}

const Properties = ({ currentUser, properties }: IPropertiesProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onDelete = useCallback(
    async (id: string) => {
      setDeletingId(id)
      await axios
        .delete(`api/listings/${id}`)
        .then(() => {
          toast.success("Deleted your property")
          router.refresh()
        })
        .finally(() => setDeletingId(""))
    },
    [router],
  )

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your Properties" />
      <div className="gridSizes">
        {properties.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            onAction={onDelete}
            actionLabel="Delete property"
            actionId={listing.id}
            disabled={listing.id === deletingId}
          />
        ))}
      </div>
    </Container>
  )
}

export default Properties
