import MemberLayout from '@/components/layouts/member'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { uploadFile } from '@/lib/firebase/service'
import userServices from '@/services/user'
import Image from 'next/image'
import { useState } from 'react'

const MemberProfileView = ({ profile, setProfile, session }: any) => {
  const [isLoading, setIsLoading] = useState('')

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault()
    setIsLoading('picture')
    const file = e.target[0]?.files[0]
    if (file) {
      uploadFile(profile.id, file, async (status: boolean, newImageURL: string) => {
        if (status) {
          const data = { image: newImageURL }
          const result = await userServices.updateProfile(profile.id, data, session.data?.accessToken)
          if (result.status === 200) {
            setIsLoading('')
            setProfile({ ...profile, image: newImageURL })
            e.target[0].value = ''
          } else {
            setIsLoading('')
          }
        } else {
          setIsLoading('')
        }
      })
    }
  }

  const handleChangeProfile = async (e: any) => {
    e.preventDefault()
    setIsLoading('profile')
    const form = e.target as HTMLFormElement
    const data = {
      fullname: form.fullname.value,
    }
    const result = await userServices.updateProfile(profile.id, data, session.data?.accessToken)
    if (result.status === 200) {
      setIsLoading('')
      setProfile({ ...profile, fullname: data.fullname })
      form.reset()
    } else {
      setIsLoading('')
    }
  }

  const handleChangePassword = async (e: any) => {
    e.preventDefault()
    setIsLoading('password')
    const form = e.target as HTMLFormElement
    const data = {
      oldPassword: form.oldPassword.value,
      password: form.newPassword.value,
      encryptedPassword: profile.password,
    }
    const result = await userServices.updateProfile(profile.id, data, session.data?.accessToken)
    if (result.status === 200) {
      setIsLoading('')
      form.reset()
    } else {
      setIsLoading('')
    }
  }

  return (
    <MemberLayout>
      <h1 className='text-2xl font-bold'>Member Profile</h1>
      <div className="flex flex-row gap-10">
        <div className="card w-96 border-2 border-neutral text-neutral-content">
          <div className="card-body items-center text-center space-y-3">
            <h2 className="card-title">Profile Picture</h2>
            <div className={`avatar ${profile.image ?? 'placeholder'}`}>
              <div className={`w-32 rounded-full ${profile.image ?? 'bg-neutral text-neutral-content'}`}>
                {profile.image ? (
                  <Image src={profile.image} alt='profile image' width={500} height={500} />
                ) : (
                  <span className="text-3xl">{profile?.fullname?.charAt(0)}</span>
                )}
              </div>
            </div>
            <form onSubmit={handleChangeProfilePicture} className='space-y-3'>
              <input
                type='file'
                name='file'
                id='file'
                className='w-full file-input file-input-sm file-input-bordered'
              />
              <p className="label-text-alt">Maximum file size is <strong>1 MB</strong></p>
              {isLoading === 'picture' ? (
                <Button className="btn-neutral">
                  <span className="loading loading-spinner"></span>
                  Uploading
                </Button>
              ) : (
                <Button type="submit" className="btn-primary">Upload</Button>
              )}
            </form>
          </div>
        </div>

        <div className="card w-96 border-2 border-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title mb-3">Profile</h2>
            <form onSubmit={handleChangeProfile} className="space-y-3">
              <Input className='input input-bordered' type='text' id='fullname' labelFor='fullname' labelName='Fullname' name='fullname' defaultValue={profile.fullname} autoComplete='on' />
              <Input className='input input-bordered' type='text' id='email' labelFor='email' labelName='Email' name='email' defaultValue={profile.email} autoComplete='on' disabled />
              <Input className='input input-bordered' type='text' id='role' labelFor='role' labelName='Role' name='role' defaultValue={profile.role} autoComplete='on' disabled />
              {isLoading === 'profile' ? (
                <Button className="btn-neutral">
                  <span className="loading loading-spinner"></span>
                  Updating
                </Button>
              ) : (
                <Button type='submit' className='btn-primary'>Update</Button>
              )}
            </form>
          </div>
        </div>

        <div className="card w-96 border-2 border-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title mb-3">Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <Input className='input input-bordered' type='password' id='oldPassword' labelFor='oldPassword' labelName='Old Password' name='oldPassword' autoComplete='on' />
              <Input className='input input-bordered' type='password' id='newPassword' labelFor='newPassword' labelName='New Password' name='newPassword' autoComplete='on' />
              {isLoading === 'password' ? (
                <Button className="btn-neutral">
                  <span className="loading loading-spinner"></span>
                  Updating
                </Button>
              ) : (
                <Button type='submit' className='btn-primary'>Update</Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberProfileView