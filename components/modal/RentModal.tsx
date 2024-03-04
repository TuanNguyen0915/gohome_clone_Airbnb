"use client"
import { useRentModal } from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "@/constants"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY)
  const rentModal = useRentModal()

  //**************FORM ******************/
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      locationValue: "",
      price: 1,
    },
  })

  //**************WATCH FORM ******************/
  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location],
  )

  const setCustomSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep(step - 1)
  }
  const onNext = () => {
    setStep(step + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined
    return "Back"
  }, [step])
  //********************BODY CONTENT FOR CATEGORY *****************/
  // default body content when step = 0 = category
  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Which of the bes t describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(category) => setCustomSetValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  )
  // STEP = LOCATION
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place location?"
          subtitle="How guest find you?"
        />
        <CountrySelect
          value={location}
          onChange={(location) => setCustomSetValue("location", location)}
        />
        <Map latlng={location?.latlng} />
      </div>
    )
    // STEP = INFO
  } else if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          onChange={(guestCount) => setCustomSetValue("guestCount", guestCount)}
          value={guestCount}
          title="Guest"
          subtile="How many guest do you allow?"
          disable={guestCount === 1}
        />
        <hr />
        <Counter
          onChange={(roomCount) => setCustomSetValue("roomCount", roomCount)}
          value={roomCount}
          title="Room"
          subtile="How many room do you have?"
          disable={roomCount === 1}
        />
        <hr />
        <Counter
          onChange={(bathroomCount) =>
            setCustomSetValue("bathroomCount", bathroomCount)
          }
          value={bathroomCount}
          title="Bathroom"
          subtile="How many bathroom do you have?"
          disable={bathroomCount === 1}
        />
      </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        title="Airbnb your home"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
      />
    </div>
  )
}

export default RentModal
