"use client"
import { IconType } from "react-icons"
import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { Suspense } from "react"
interface ICategoryItemProps {
  selected?: boolean
  label: string
  icon: IconType
}

const CategoryItem = ({ label, icon: Icon, selected }: ICategoryItemProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updateQuery: any = {
      ...currentQuery,
      category: label,
    }
    if (params?.get("category") === label) {
      delete updateQuery.category
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true },
    )
    router.push(url)
  }, [params, label, router])
  return (
    <Suspense>
      <div
        onClick={handleClick}
        className={`flexCenter cursor-pointer flex-col gap-2 border-b-2 p-3 pb-0 transition hover:text-neutral-800 ${selected ? "border-b-red-500 text-neutral-800" : "border-transparent text-neutral-500"}`}
      >
        <Icon size={24} />
        <p className={"text-sm font-medium"}>{label}</p>
      </div>
    </Suspense>
  )
}
export default CategoryItem
