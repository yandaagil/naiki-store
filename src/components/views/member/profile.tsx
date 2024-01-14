import MemberLayout from '@/components/layouts/member'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Image from 'next/image'

const MemberProfileView = ({ profile }: any) => {

  return (
    <MemberLayout>
      <h1 className='text-2xl font-bold'>Member Profile</h1>
      <form className="space-y-3">
        <div className="avatar">
          <div className="w-24 rounded">
            <Image src={profile.image} alt='profile image' width={500} height={500} />
          </div>
        </div>
        <Input className='file-input file-input-bordered' type='file' id='file' labelFor='file' labelName='Image Upload' name='file' />
        <Input className='input input-bordered' type='text' id='fullname' labelFor='fullname' labelName='Fullname' name='fullname' defaultValue={profile.fullname} autoComplete='on' />
        <Input className='input input-bordered' type='text' id='email' labelFor='email' labelName='Email' name='email' defaultValue={profile.email} autoComplete='on' />
        {/* <Input type='password' id='password' labelFor='password' labelName='Password' name='password' defaultValue={profile.password} /> */}
        <Button type='submit' className='btn-primary'>Update</Button>
      </form>
    </MemberLayout>
  )
}

export default MemberProfileView