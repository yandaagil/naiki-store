import React from 'react'
import Sidebar from '../sidebar'
import { LayoutDashboard, Package, Users } from 'lucide-react'

type AdminLayoutProps = {
  children: React.ReactNode
}

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboard size={16} />
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <Package size={16} />
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <Users size={16} />
  }
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='flex flex-row'>
      <Sidebar title='Admin' lists={listSidebarItem} />
      <div className='py-5 px-7 space-y-3'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout