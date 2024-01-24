type InputProps = {
  labelFor: string
  labelName: string
  name: string
  id: string
  type: string
  className?: string
  autoComplete?: string
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
}

const Input = ({ labelFor, labelName, name, id, type, className, autoComplete, defaultValue, disabled, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={labelFor}>{labelName}</label>
      <input
        type={type}
        name={name}
        id={id}
        className={`w-full ${className}`}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input