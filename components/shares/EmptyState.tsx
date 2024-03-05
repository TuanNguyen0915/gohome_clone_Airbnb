"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface IEmptyState {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or remove some of your filter",
  showReset,
}: IEmptyState) => {
  const router = useRouter()

  return (
    <div className="flexCenter h-[60vh] flex-col gap-2">
      <Heading title={title} subtitle={subtitle} center />
      <div className="m-4 w-48">
        {showReset && (
          <Button
            label="Remove all filters"
            outline
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
