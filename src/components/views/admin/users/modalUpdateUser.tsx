import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropTypes = {
  id: string
  updatedUser: User | any
  setUsersData: Dispatch<SetStateAction<User[]>>
  session: any
}

const ModalUpdateUser = ({ id, updatedUser, setUsersData, session }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const form: any = e.target as HTMLFormElement

    const data = {
      role: form.role.value
    }

    const result = await userServices.updateUser(updatedUser.id, data, session.data?.accessToken)

    if (result.status === 200) {
      setIsLoading(false)
      const { data } = await userServices.getAllUsers()
      setUsersData(data.data)
      const editModal = document.getElementById('edit') as HTMLDialogElement;
      if (editModal) editModal.close();
      toast.success('User has been updated')
    } else {
      setIsLoading(false)
      toast.error('Failed to update user')
    }
  }

  return (
    <Modal id={id} title="Update User">
      <form className="space-y-3" onSubmit={handleUpdateUser}>
        <Input
          className='input input-bordered'
          type='text'
          id='fullname'
          labelFor='fullname'
          labelName='Fullname'
          name='fullname'
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          className='input input-bordered'
          type='text'
          id='email'
          labelFor='email'
          labelName='Email'
          name='email'
          defaultValue={updatedUser.email}
          disabled
          autoComplete='off'
        />
        <Select
          labelFor='role'
          labelName='Role'
          name='role'
          id='role'
          defaultValue={updatedUser.role}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'member', label: 'Member' }
          ]}
        />
        {isLoading ? (
          <Button className="btn btn-disabled btn-block">
            <span className="loading loading-spinner"></span>
            Loading
          </Button>
        ) : (
          <Button type='submit' className='btn-primary w-full'>Update</Button>
        )}
      </form>
    </Modal>
  )
}

export default ModalUpdateUser