import React from 'react'
import { Chat, Header} from './index'

export default function ChatContainer() {
  return (
    <div className='w-full h-screen flex flex-col justify-center bg-red-400'>
      <Header />
      <Chat />
    </div>
  )
}
