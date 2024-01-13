import React from 'react'
import { Outlet } from 'react-router-dom';
export default function EditLayout() {
  return (

        <div className='bg-[#ecf0f5] w-full h-screen'>
         
          <Outlet></Outlet>
        </div>
      
  )
}
