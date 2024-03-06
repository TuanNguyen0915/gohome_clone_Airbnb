"use client"

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface ICounterProps {
  title: string
  subtile: string
  value: number
  onChange: (value: number) => void
  disable?: boolean
}

const Counter = ({
  title,
  subtile,
  value,
  onChange,
  disable,
}: ICounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value === 1) return
    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flexBetween">
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p className="font-light text-gray-600">{subtile}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={disable}
          onClick={onReduce}
          className={`flexCenter h-10 w-10 cursor-pointer rounded-full border-[1px] border-neutral-500 text-neutral-800 transition hover:opacity-80 ${disable ? "hidden" : "opacity-100"}`}
        >
          <AiOutlineMinus />
        </button>
        <div className="text-xl font-light text-neutral-600">{value}</div>
        <button
          onClick={onAdd}
          className="flexCenter h-10 w-10 cursor-pointer rounded-full border-[1px] border-neutral-500 text-neutral-800 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}

export default Counter
