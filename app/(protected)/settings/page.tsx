import { logout } from '@/actions/logout'
import { auth, signOut } from '@/auth'
import React from 'react'
// import { useSession } from 'next-auth/react'


const page = async () => {

    // const session = useSession() for client component
    const session = await auth()

    const logout = () => {
      logout()
    }
    
  return (
    <>
      <div>
        {JSON.stringify(session)}
      </div>
      <form action={async() => {
        "use server"
        await signOut()
      }}>
      <button type="submit">
        signOut
      </button>
      </form>
    </>
  )
}

export default page