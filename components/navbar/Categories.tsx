"use client"
import Container from "@/components/shares/Container"
import CategoryItem from "@/components/navbar/CategoryItem"
import { categories } from "@/constants"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"
const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()
  const isMainPage = pathname === "/"
  if (!isMainPage) {
    return null
  }

  return (
    <Suspense>
      <Container>
        <div className="flexBetween overflow-x-auto pt-4">
          {categories.map((item) => (
            <CategoryItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
      </Container>
    </Suspense>
  )
}
export default Categories
