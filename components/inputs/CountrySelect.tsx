"use client"

import { useCountries } from "@/hooks/useCountry"
import Select from "react-select"

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  value: string
  region: string
}

interface ICountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect = ({ value, onChange }: ICountrySelectProps) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Select the country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex items-center gap-4">
            <p>{option.flag}</p>
            <p>
              {option.label},{" "}
              <span className="italic text-neutral-600 ">{option.region}</span>
            </p>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "gray",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  )
}

export default CountrySelect
