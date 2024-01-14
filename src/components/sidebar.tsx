import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './ui/button'
import { signOut } from 'next-auth/react'
import { ArrowLeft } from 'lucide-react'

type SidebarProps = {
  title: string
  lists: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
}

const Sidebar = ({ title, lists }: SidebarProps) => {
  const { pathname } = useRouter()

  return (
    <ul className="menu bg-base-200 w-56 justify-between">
      <div>
        <h2 className="mb-3 px-4 py-2 font-bold text-lg text-center">{`${title} Panel`}</h2>
        {lists.map((list, index) => (
          <li key={index} className={`${pathname === list.url && 'btn-active rounded-lg'}`}>
            <Link href={list.url}>
              {list.icon}
              {list.title}
            </Link>
          </li>
        ))}
      </div>
      <div className='space-y-3'>
        <Link href='/'>
          <Button type='button' className='btn-neutral btn-block'>
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <Button type='button' className='btn-sm btn-outline btn-error btn-block' onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </ul>
  )
}

export default Sidebar