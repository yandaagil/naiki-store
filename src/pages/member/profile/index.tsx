import MemberProfileView from '@/components/views/member/profile'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const MemberProfilePage = () => {
  const [profile, setProfile] = useState<User | {}>({})
  const session: any = useSession()

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(session.data?.accessToken)
        setProfile(data.data)
      }
      getProfile()
    }
  }, [profile, session])

  return (
    <main className="flex min-h-screen">
      <MemberProfileView profile={profile} setProfile={setProfile} session={session} />
    </main>
  )
}

export default MemberProfilePage