import React from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { LoginButton } from '@/components/auth'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})
const page = () => {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-sky-500'>
        <div className='space-y-6'>
          <h1 className={cn('text-6xl text-white font-semibold drop-shadow-md',
          font.className)}>
            Auth
          </h1>
          <p className='text-white text-lg'>A simple authentication</p>
          <div>
            <LoginButton>
              <Button variant={'secondary'} 
              size={'lg'}>Sign in</Button>
            </LoginButton>
            
          </div>
        </div>
    </main>
  )
}

export default page