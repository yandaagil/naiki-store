import AuthLayout from "@/components/layouts/auth"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import authServices from "@/services/auth"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

const Register = () => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    const form = e.target as HTMLFormElement

    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    }

    const result = await authServices.registerAccount(data)

    if (result.status === 200) {
      form.reset()
      setIsLoading(false)
      push('/auth/login')
    } else {
      setIsLoading(false)
      setError('Email already exists!')
    }
  }

  return (
    <AuthLayout error={error} link="/auth/login" linkText="Already have an account?" title="Sign Up" alertOnClick={() => setError('')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input labelFor="fullname" labelName="Name" name="fullname" id="fullname" type="text" />
        <Input labelFor="email" labelName="Email" name="email" id="email" type="email" autoComplete="on" />
        <Input labelFor="password" labelName="Password" name="password" id="password" type="password" />
        {isLoading ? (
          <Button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </Button>
        ) : (
          <Button type="submit" className="btn-primary btn-block">Sign Up</Button>
        )}
      </form>
    </AuthLayout>
  )
}

export default Register