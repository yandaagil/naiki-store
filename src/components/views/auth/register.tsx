import AuthLayout from "@/components/layouts/auth"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import authServices from "@/services/auth"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const Register = () => {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.target as HTMLFormElement

    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    }

    try {
      const result = await authServices.registerAccount(data)

      if (result.status === 200) {
        form.reset()
        setIsLoading(false)
        toast.success('Register success!')
        push('/auth/login')
      } else {
        setIsLoading(false)
        toast.error('Register failed!, please try again later')
      }
    } catch (error) {
      setIsLoading(false)
      toast.error('Email already exists!')
    }
  }

  return (
    <AuthLayout link="/auth/login" linkText="Already have an account?" linkTitle="Sign In" title="Sign Up">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input className="input input-bordered" labelFor="fullname" labelName="Name" name="fullname" id="fullname" type="text" />
        <Input className="input input-bordered" labelFor="email" labelName="Email" name="email" id="email" type="email" autoComplete="on" />
        <Input className="input input-bordered" labelFor="password" labelName="Password" name="password" id="password" type="password" />
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