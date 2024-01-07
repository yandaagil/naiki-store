import Input from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

const Login = () => {
  const { push, query } = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl: any = query.callbackUrl || '/'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    const form = e.target as HTMLFormElement

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl
      })

      if (!res?.error) {
        setIsLoading(false)
        form.reset()
        push(callbackUrl)
      } else {
        setIsLoading(false)
        setError('Email or password is incorrect!')
      }
    } catch (error) {
      setIsLoading(false)
      setError('Email or password is incorrect!')
    }
  }

  return (
    <div className="mx-auto w-96 space-y-7">
      <h1 className="text-center font-bold text-2xl">Sign In</h1>
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
        <Input labelFor="email" labelName="Email" name="email" id="email" type="email" autoComplete="on" />
        <Input labelFor="password" labelName="Password" name="password" id="password" type="password" />
        {isLoading ? (
          <button className="btn btn-neutral btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        )}
      </form>
      <div className="divider">OR</div>
      <button type="button" className="btn btn-neutral btn-block" onClick={() => signIn('google', { callbackUrl, redirect: false })}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
        Sign In with Google
      </button>
      <p className="text-center">Don&apos;t have an account? <Link href='/auth/register' className="link link-primary">Sign Up</Link></p>
    </div>
  )
}

export default Login