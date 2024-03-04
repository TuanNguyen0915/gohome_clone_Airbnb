"use client"
import Select from "react-select"
import useCountry from "@/hooks/useCountry"

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface ICountrySelectProps {
  value: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect = ({ value, onChange }: ICountrySelectProps) => {
  const { getAll } = useCountry()
  return (
    <>
      <Select
        placeholder="Select the country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-10">
            <p>{option.flag}</p>
            <p>
              {option.label},{" "}
              <span className="text-neutral-600">{option.region}</span>
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
          colors: { ...theme.colors, borderRadius: 12, primary25: "#ffe4e6" },
        })}
      />
    </>
  )
}

export default CountrySelect
