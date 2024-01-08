import AdminLayout from '@/components/layouts/admin'
import Button from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ModalUpdateUser from './modalUpdateUser'
import { Pencil, Trash } from 'lucide-react'
import userServices from '@/services/user'
import ModalDeleteUser from './modalDeleteUser'

type AdminUsersViewProps = {
  users: any
}

const AdminUsersView = ({ users }: AdminUsersViewProps) => {
  const [updatedUser, setupdatedUser] = useState<any>({})
  const [deletedUser, setDeletedUser] = useState<any>({})
  const [usersData, setUsersData] = useState([])

  useEffect(() => {
    setUsersData(users)
  }, [users])

  const handleEditModal = (user: any) => {
    const editModal = document.getElementById('edit') as HTMLDialogElement;

    if (editModal) {
      editModal.showModal();
      setupdatedUser(user);
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
              {usersData.map((user: any, index: number) =>
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
      <ModalUpdateUser id="edit" updatedUser={updatedUser} setUsersData={setUsersData} />
      <ModalDeleteUser id="delete" deletedUser={deletedUser} setUsersData={setUsersData} />
    </>
  )
}

export default AdminUsersView