"use client"

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import { useLoginModel } from "@/hooks/useLoginModal"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModel()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoading(false)
      if (callback?.ok) {
        toast.success("Logged in")
        router.refresh()
        loginModal.onClose()
      }
      if(callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        type="email"
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
        onClick={() => {}}
        outline
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
        outline
      />
      <div className="flexCenter mt-4 gap-4 font-light text-neutral-500">
        <p>Already have an account?</p>
        <p
          className="cursor-pointer text-neutral-800 hover:underline"
          onClick={() => loginModal.onClose()}
        >
          Login
        </p>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerCOntent}
    />
  )
}

export default LoginModal
