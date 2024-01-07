import React from 'react'
import Sidebar from '../sidebar'
import { LayoutDashboard, Package } from 'lucide-react'

type AdminLayoutProps = {
  children: React.ReactNode
}

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboard size={20} />
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <Package size={20} />
  }
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='flex flex-row'>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  )
}

export default AdminLayout