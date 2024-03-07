import AdminLayout from '@/components/layouts/admin'
import Button from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ModalUpdateUser from './modalUpdateUser'
import { Pencil, Trash } from 'lucide-react'
import ModalDeleteUser from './modalDeleteUser'
import { User } from '@/types/user.type'
import { useSession } from 'next-auth/react'

type AdminUsersViewProps = {
  users: User[]
}

const AdminUsersView = ({ users }: AdminUsersViewProps) => {
  const [updatedUser, setUpdatedUser] = useState<User | {}>({})
  const [deletedUser, setDeletedUser] = useState<User | {}>({})
  const [usersData, setUsersData] = useState<User[]>([])
  const session: any = useSession()

  useEffect(() => {
    setUsersData(users)
  }, [users])

  const handleEditModal = (user: any) => {
    const editModal = document.getElementById('edit') as HTMLDialogElement;
    if (editModal) {
      editModal.showModal();
      setUpdatedUser(user);
    }
  }

  const handleDeleteModal = (user: any) => {
    const deleteModal = document.getElementById('delete') as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.showModal();
      setDeletedUser(user);
    }
  }

  return (
    <>
      <AdminLayout>
        <h1 className='text-2xl font-bold'>User Management</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User, index: number) =>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                      {user.role}
                    </div>
                  </td>
                  <td className='flex gap-2'>
                    <Button type='button' className='btn-sm' onClick={() => handleEditModal(user)}><Pencil size={16} /></Button>
                    <Button type='button' className='btn-sm btn-ghost text-red-600' onClick={() => handleDeleteModal(user)}><Trash size={16} /></Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      <ModalUpdateUser id="edit" updatedUser={updatedUser} setUsersData={setUsersData} session={session} />
      <ModalDeleteUser id="delete" deletedUser={deletedUser} setUsersData={setUsersData} session={session} />
    </>
  )
}

export default AdminUsersView