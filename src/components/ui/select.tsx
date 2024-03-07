type SelectProps = {
  labelFor: string
  labelName: string
  name: string
  id: string
  className?: string
  defaultValue?: string
  disabled?: boolean
  options: {
    value: string
    label: string
  }[]
}

const Select = ({ labelFor, labelName, name, id, className, defaultValue, options, disabled }: SelectProps) => {
  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={labelFor}>{labelName}</label>
      <select
        name={name}
        id={id}
        className={`select select-bordered w-full ${className}`}
        disabled={disabled}
      >
        {options.map((option, index) =>
          defaultValue === option.value ? (
            <option key={index} value={option.value} selected>{option.label}</option>
          ) : (
            <option key={index} value={option.value}>{option.label}</option>
          )
        )}
      </select>
    </div>
  )
}

export default Select