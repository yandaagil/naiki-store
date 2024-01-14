import React from 'react'
import Sidebar from '../sidebar'
import { LayoutDashboard, ShoppingCart, User } from 'lucide-react'

type MemberLayoutProps = {
  children: React.ReactNode
}

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: <LayoutDashboard size={16} />
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: <ShoppingCart size={16} />
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: <User size={16} />
  }
]

const MemberLayout = ({ children }: MemberLayoutProps) => {
  return (
    <div className='flex flex-row'>
      <Sidebar title='Member' lists={listSidebarItem} />
      <div className='py-5 px-7 space-y-5'>
        {children}
      </div>
    </div>
  )
}

export default MemberLayout