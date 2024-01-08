import AdminUsersView from "@/components/views/admin/users"
import userServices from "@/services/user"
import { useEffect, useState } from "react"

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers()
      setUsers(data.data)
    }
    getAllUsers()
  }, [])

  return (
    <main className="flex min-h-screen">
      <AdminUsersView users={users} />
    </main>
  )
}

export default AdminUsersPage