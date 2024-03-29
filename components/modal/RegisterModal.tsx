"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useRegisterModel } from "@/hooks/useRegisterModal"
import { useState } from "react"
import Modal from "./Modal"
import Heading from "../Shares/Heading"
import Input from "../Inputs/Input"
import toast from "react-hot-toast"
import Button from "../Shares/Button"
import { signIn } from "next-auth/react"
import { useLoginModal } from "@/hooks/useLoginModal"
import { useRouter } from "next/navigation"

const RegisterModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModel()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose()
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then(() => {
          toast.success("Welcome to goHome")
          router.refresh()
        })
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to goHome" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerCOntent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google")
        }}
        outline
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github")
        }}
        outline
      />
      <div className="flexCenter mt-4 gap-4 font-light text-neutral-500">
        <p>Already have an account?</p>
        <p
          className="cursor-pointer text-neutral-800 hover:underline"
          onClick={() => {
            registerModal.onClose()
            loginModal.onOpen()
          }}
        >
          Login
        </p>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerCOntent}
    />
  )
}

export default RegisterModal
