import MemberLayout from '@/components/layouts/member'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { uploadFile } from '@/lib/firebase/service'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropTypes = {
  profile: User | any
  setProfile: Dispatch<SetStateAction<{}>>
  session: any
}

const MemberProfileView = ({ profile, setProfile, session }: PropTypes) => {
  const [isLoading, setIsLoading] = useState('')
  const [changeImg, setChangeImg] = useState<any>({})

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading('picture')
    const form = e.target as HTMLFormElement
    const file = form.file.files[0]
    const newName = 'profile.' + file.name.split('.')[1]
    if (file) {
      uploadFile(profile.id, file, newName, 'users', async (status: boolean, newImageURL: string) => {
        if (status) {
          const data = { image: newImageURL }
          const result = await userServices.updateProfile(data, session.data?.accessToken)
          if (result.status === 200) {
            setIsLoading('')
            setProfile({ ...profile, image: newImageURL })
            form.reset()
            toast.success('Profile picture has been updated')
          } else {
            setIsLoading('')
          }
        } else {
          setIsLoading('')
          toast.error('Failed to upload profile picture')
        }
      })
    }
  }

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading('profile')
    const form = e.target as HTMLFormElement
    const data = {
      fullname: form.fullname.value,
    }
    const result = await userServices.updateProfile(data, session.data?.accessToken)
    if (result.status === 200) {
      setIsLoading('')
      setProfile({ ...profile, fullname: data.fullname })
      form.reset()
      toast.success('Profile has been updated')
    } else {
      setIsLoading('')
    }
  }

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading('password')
    const form = e.target as HTMLFormElement
    const data = {
      oldPassword: form.oldPassword.value,
      password: form.newPassword.value,
      encryptedPassword: profile.password,
    }
    try {
      const result = await userServices.updateProfile(data, session.data?.accessToken)
      if (result.status === 200) {
        setIsLoading('')
        form.reset()
        toast.success('Password has been updated')
      }
    } catch (error) {
      setIsLoading('')
      toast.error('Failed to update password')
    }
  }

  return (
    <MemberLayout>
      <h1 className='text-2xl font-bold'>Member Profile</h1>
      <div className="flex flex-row gap-10">
        <div className="card w-96 border-2 border-neutral">
          <div className="card-body items-center text-center space-y-3">
            <h2 className="card-title">Profile Picture</h2>
            <div className={`avatar ${!profile.image && 'placeholder'}`}>
              <div className={`w-32 rounded-full ${!profile.image && 'bg-neutral'}`}>
                {profile.image ? (
                  <Image src={profile.image} alt='profile image' width={500} height={500} priority={true} />
                ) : (
                  <span className="text-3xl">{profile?.fullname?.charAt(0)}</span>
                )}
              </div>
            </div>
            <form onSubmit={handleChangeProfilePicture} className='space-y-3 w-full flex flex-col'>
              <label htmlFor='file'>
                <div className='w-full flex items-center justify-center rounded-xl border-2 border-dashed border-neutral h-20 text-sm cursor-pointer transition-colors hover:bg-gray-200'>
                  {changeImg.name ? (
                    <span>{changeImg.name}</span>
                  ) : (
                    <span>
                      Upload Image <br />
                      Max 1 MB
                    </span>
                  )}
                </div>
              </label>
              <input
                type='file'
                name='file'
                id='file'
                className='hidden'
                onChange={(e: any) => {
                  e.preventDefault()
                  setChangeImg(e.currentTarget.files[0])
                }}
              />
              {changeImg.name &&
                <Button type='button' className='w-fit btn-sm font-medium btn-error btn-outline' onClick={() => setChangeImg({})}>
                  Remove Image
                </Button>
              }
              {isLoading === 'picture' ? (
                <Button className="btn-neutral btn-disabled">
                  <span className="loading loading-spinner"></span>
                  Uploading
                </Button>
              ) : (
                <Button type="submit" className={`btn-primary ${!changeImg.name && 'btn-disabled'}`}>Upload</Button>
              )}
            </form>
          </div>
        </div>

        <div className="card w-96 border-2 border-neutral">
          <div className="card-body">
            <h2 className="card-title mb-3">Profile</h2>
            <form onSubmit={handleChangeProfile} className="space-y-3 flex flex-col">
              <Input
                className='input input-bordered'
                type='text'
                id='fullname'
                labelFor='fullname'
                labelName='Fullname'
                name='fullname'
                defaultValue={profile.fullname}
                autoComplete='on'
              />
              <Input
                className='input input-bordered'
                type='text'
                id='email'
                labelFor='email'
                labelName='Email'
                name='email'
                defaultValue={profile.email}
                autoComplete='on'
                disabled
              />
              <Input
                className='input input-bordered'
                type='text'
                id='role'
                labelFor='role'
                labelName='Role'
                name='role'
                defaultValue={profile.role}
                autoComplete='on'
                disabled
              />
              {isLoading === 'profile' ? (
                <Button className="btn-neutral btn-disabled">
                  <span className="loading loading-spinner"></span>
                  Updating
                </Button>
              ) : (
                <Button type='submit' className='btn-primary'>Update</Button>
              )}
            </form>
          </div>
        </div>

        <div className="card w-96 border-2 border-neutral">
          <div className="card-body">
            <h2 className="card-title mb-3">Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-3 flex flex-col">
              <Input
                className='input input-bordered'
                type='password'
                id='oldPassword'
                labelFor='oldPassword'
                labelName='Old Password'
                name='oldPassword'
                autoComplete='on'
                disabled={profile.type === 'google'}
                placeholder='Enter your current password'
              />
              <Input
                className='input input-bordered'
                type='password'
                id='newPassword'
                labelFor='newPassword'
                labelName='New Password'
                name='newPassword'
                autoComplete='on'
                disabled={profile.type === 'google'}
                placeholder='Enter your new password'
              />
              {isLoading === 'password' ? (
                <Button className="btn-neutral btn-disabled">
                  <span className="loading loading-spinner"></span>
                  Updating
                </Button>
              ) : (
                <Button type='submit' className='btn-primary' disabled={isLoading === 'password' || profile.type === 'google'}>Update</Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberProfileView