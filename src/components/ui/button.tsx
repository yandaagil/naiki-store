type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ type, className, children, onClick, disabled }: ButtonProps) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button