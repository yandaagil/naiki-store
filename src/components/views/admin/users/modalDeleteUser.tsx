import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropTypes = {
  id: string
  deletedUser: User | any
  setUsersData: Dispatch<SetStateAction<User[]>>
  session: any
}

const ModalDeleteUser = ({ id, deletedUser, setUsersData, session }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await userServices.deleteUser(deletedUser.id, session.data?.accessToken)

    if (result.status === 200) {
      setIsLoading(false)
      const { data } = await userServices.getAllUsers()
      setUsersData(data.data)
      const deleteModal = document.getElementById('delete') as HTMLDialogElement;
      if (deleteModal) deleteModal.close();
      toast.success('User has been deleted')
    } else {
      setIsLoading(false)
      toast.error('Failed to delete user')
    }
  }
  return (
    <Modal id={id} title="Delete User">
      <form className="space-y-3" onSubmit={handleDeleteUser}>
        <Input className='input input-bordered' type='text' id='fullname' labelFor='fullname' labelName='Fullname' name='fullname' defaultValue={deletedUser.fullname} disabled />
        <Input className='input input-bordered' type='text' id='email' labelFor='email' labelName='Email' name='email' defaultValue={deletedUser.email} disabled />
        <Input className='input input-bordered' type='text' id='role' labelFor='role' labelName='Role' name='role' defaultValue={deletedUser.role} disabled />
        {isLoading ? (
          <Button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </Button>
        ) : (
          <Button type='submit' className='btn-error btn-outline w-full'>Delete</Button>
        )}
      </form>
    </Modal>
  )
}

export default ModalDeleteUser