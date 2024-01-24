import Link from 'next/link'
import React from 'react'

type AuthLayoutProps = {
  title?: string
  children: React.ReactNode
  link: string
  linkText?: string
  linkTitle?: string
}

const AuthLayout = ({ title, children, link, linkText, linkTitle }: AuthLayoutProps) => {
  return (
    <div className="mx-auto w-96 space-y-7">
      <h1 className="text-center font-bold text-2xl">{title}</h1>
      {children}
      <p className="text-center">{linkText} <Link href={link} className="link link-primary">{linkTitle}</Link></p>
    </div>
  )
}

export default AuthLayout