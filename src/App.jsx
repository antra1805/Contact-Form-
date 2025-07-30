import React, { useState } from 'react'
import ContactForm from './Components/ContactForm'

const App = () => {

  const [notification , setNotification] = useState('');
  return (
    <div className = 'bg-blue-200 min-h-screen flex justify-center items-center relative'>
      {/* Notification */}
      {
        notification &&(
          <div className='absolute top-5 bg-green-600 text-white rounded-full px-5 py-2'>
          {notification}
          </div>
        )
      }
      <ContactForm setNotification={setNotification} />
    </div>
  )
}

export default App
