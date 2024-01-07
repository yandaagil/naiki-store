import { signIn, signOut, useSession } from "next-auth/react"

const Navbar = () => {
  const { data } = useSession()

  return (
    <button className="btn btn-primary" onClick={() => data ? signOut() : signIn()}>
      {data ? 'Log Out' : 'Login'}
    </button>
  )
}

export default Navbar