"use client"
import { useRentModal } from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "@/constants"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)
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
  const imageSrc = watch("imageSrc")
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }
    setIsLoading(true)
    axios
      .post(`/api/listings`, data)
      .then(() => {
        toast.success("Listing Created!!!")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => setIsLoading(false))
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
  } else if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place "
          subtitle="Show guest what your place look like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(imageSrc) => setCustomSetValue("imageSrc", imageSrc)}
        />
      </div>
    )
  } else if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night"
        />
        <Input
          formatPrice
          id="price"
          label="Price"
          type="number"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <div>
      <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
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
