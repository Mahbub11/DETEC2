import React from 'react'
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className='bg-[#DCE8F5] w-full h-screen'>
         
          <Outlet></Outlet>
        </div>
      );
}
