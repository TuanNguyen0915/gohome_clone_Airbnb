"use client"
import { useSearchModal } from "@/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import qs from "query-string"
import { formatISO } from "date-fns"
import Heading from "../shares/Heading"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"
import { Suspense } from "react"
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  })

  const Map = useMemo(
    () =>
      dynamic(() => import("../shares/Map"), {
        ssr: false,
      }),
    [location]
  )

  const onBack = useCallback(() => {
    setStep(step - 1)
  }, [step])
  const onNext = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
    
  }, [
    bathroomCount,
    roomCount,
    guestCount,
    dateRange,
    location,
    onNext,
    params,
    step,
    router,
    searchModal,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation(value as CountrySelectValue)
        }}
      />
      <hr />
      <Map latlng={location?.latlng} />
    </div>
  )
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go"
          subtitle="Make sure everyone is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guest"
          subtile="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
          disable={guestCount === 1}
        />
        <Counter
          title="Room"
          subtile="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
          disable={roomCount === 1}
        />
        <Counter
          title="Bathroom"
          subtile="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
          disable={bathroomCount === 1}
        />
      </div>
    )
  }
  return (
    <Suspense>
      <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filter"
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
      />
    </Suspense>
  )
}

export default SearchModal
