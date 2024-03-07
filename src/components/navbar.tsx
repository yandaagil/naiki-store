import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession()

  return (
    <nav className='text-center p-2 sticky top-0 bg-white z-10'>
      <button className="font-semibold p-3 border-b-2 border-transparent hover:border-b-2 hover:border-black">
        <Link href='/admin'>
          Admin
        </Link>
      </button>
      <button className="font-semibold p-3 border-b-2 border-transparent hover:border-b-2 hover:border-black">
        <Link href='/member'>
          Member
        </Link>
      </button>
      <button className="font-semibold p-3 border-b-2 border-transparent hover:border-b-2 hover:border-black" onClick={() => data ? signOut() : signIn()}>
        {data ? 'Log Out' : 'Login'}
      </button>
    </nav>
  )
}

export default Navbar