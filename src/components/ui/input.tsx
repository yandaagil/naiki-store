type InputProps = {
  labelFor: string
  labelName: string
  name: string
  id: string
  type: string
  className?: string
  autoComplete?: string
}

const Input = ({ labelFor, labelName, name, id, type, className, autoComplete }: InputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={labelFor}>{labelName}</label>
      <input type={type} name={name} id={id} className={`input input-bordered w-full ${className}`} autoComplete={autoComplete} />
    </div>
  )
}

export default Input