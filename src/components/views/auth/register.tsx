import Input from "@/components/ui/input"
import Link from "next/link"
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

    const result = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
    <div className="mx-auto w-96 space-y-7">
      <h1 className="text-center font-bold text-2xl">Sign Up</h1>
      {error &&
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
          <button className="btn btn-sm btn-circle" onClick={() => setError('')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input labelFor="fullname" labelName="Name" name="fullname" id="fullname" type="text" />
        <Input labelFor="email" labelName="Email" name="email" id="email" type="email" autoComplete="on" />
        <Input labelFor="password" labelName="Password" name="password" id="password" type="password" />
        {isLoading ? (
          <button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        )}
      </form>
      <p className="text-center">Already have an account? <Link href='/auth/login' className="link link-primary">Sign In</Link></p>
    </div>
  )
}

export default Register