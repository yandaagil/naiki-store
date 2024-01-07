import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './ui/button'
import { signOut } from 'next-auth/react'

type SidebarProps = {
  lists: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
}

const Sidebar = ({ lists }: SidebarProps) => {
  const { pathname } = useRouter()

  return (
    <ul className="menu bg-base-200 w-56 justify-between">
      <div>
        <h2 className="menu-title">Title</h2>
        {lists.map((list, index) => (
          <li key={index} className={`${pathname === list.url && 'btn-active rounded-lg'}`}>
            <Link href={list.url}>
              {list.icon}
              {list.title}
            </Link>
          </li>
        ))}
      </div>
      <Button type='button' className='btn-sm btn-outline btn-error' onClick={() => signOut()}>
        Sign Out
      </Button>
    </ul>
  )
}

export default Sidebar