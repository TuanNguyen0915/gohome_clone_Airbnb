"use client"
import { Range } from "react-date-range"
import Calendar from "../Inputs/Calendar"
import Button from "../Shares/Button"

interface IListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  disabled: boolean
  disabledDates: Date[]
  onSubmit: () => void
  onChangeDate: (value: Range) => void
}

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  onSubmit,
  onChangeDate,
  disabled,
  disabledDates,
}: IListingReservationProps) => {
  return (
    <div className="overflow-hidden rounded-lg border-[1px] border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <p className="text-2xl font-semibold">
          $ {price}{" "}
          <span className="text-lg font-light text-neutral-500">night</span>
        </p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="flexBetween p-4 text-lg font-semibold">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
    </div>
  )
}

export default ListingReservation
