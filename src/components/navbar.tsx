import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession()

  return (
    <>
      <button className="btn btn-primary" onClick={() => data ? signOut() : signIn()}>
        {data ? 'Log Out' : 'Login'}
      </button>
      <button className="ml-3 btn btn-primary">
        <Link href='/admin'>
          Admin
        </Link>
      </button>
      <button className="ml-3 btn btn-primary">
        <Link href='/member'>
          Member
        </Link>
      </button>
    </>
  )
}

export default Navbar