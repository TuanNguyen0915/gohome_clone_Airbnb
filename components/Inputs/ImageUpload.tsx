"use client"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface IImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload = ({ onChange, value }: IImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )
  return (
    <div>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="flexCenter relative cursor-pointer flex-col gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
            >
              <TbPhotoPlus size={40} />
              <p className="text-lg font-semibold">Click to upload</p>
              {value && (
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "contain" }}
                    src={value}
                  />
                </div>
              )}
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
