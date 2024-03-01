"use client"

import { useCallback, useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import Button from "../Button"

interface IModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactNode
  footer?: React.ReactNode
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen)
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return null
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    secondaryAction()
  }, [secondaryAction, disabled])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="flexCenter fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-neutral-800/80 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          {/* CONTENT */}
          <div
            className={`translate h-full duration-500
            ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-slate-50 outline-none focus:outline-none md:h-auto">
              {/* HEADER */}
              <div className="flexCenter relative rounded-t border-b-[1px] p-6">
                <button
                  onClick={handleClose}
                  className="absolute left-10 border-0 p-1 transition hover:scale-150 hover:opacity-70"
                >
                  <MdClose />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full items-center gap-4">
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
