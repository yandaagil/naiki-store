import MemberProfileView from '@/components/views/member/profile'
import userServices from '@/services/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const MemberProfilePage = () => {
  const [profile, setProfile] = useState({})
  const session: any = useSession()

  useEffect(() => {
    const getUserProfile = async () => {
      const { data } = await userServices.getProfile(session.data?.accessToken)
      setProfile(data.data)
    }
    getUserProfile()
  }, [session])

  return (
    <main className="flex min-h-screen">
      <MemberProfileView profile={profile} />
    </main>
  )
}

export default MemberProfilePage