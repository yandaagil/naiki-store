type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

const Button = ({ type, className, children, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button