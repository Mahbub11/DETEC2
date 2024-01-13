import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { API_LEVEL } from '../../config'
import axiosInstance from '../../utils/axios'
import IconActivationSVG from '../../Assets/SVG/IconActivationSVG'
import { Skeleton } from 'antd'

export default function AccountActivationPage() {
 
    const { actoken } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toastMsg,setToastMsg] =useState('Active Your Account to Enjoy full services! ');
    const [loading,isLoading] =useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        isLoading(true)

       

        axiosInstance.get(`${API_LEVEL}/auth/activation/${actoken}`).then(res=>{
            setToastMsg('Account Activated, Redirect to Login Page')
            isLoading(false)

            setTimeout(()=>{
                navigate("http://localhost:3000/auth/signin")
            },3000)
         
        }).catch(error=>{
            setToastMsg('Account Activation Failed.')
            isLoading(false)

        })
       
    }

    useEffect(() => {
        // if (isError) {
        //     toast.error(message)
        // }

        // if (isSuccess) {
        //     navigate("/login")
        // }

        // dispatch(reset())

    }, [])


    return (
        <div className='w-full h-full m-auto'>
            <div className='flex justify-center'>
            <h1
            className="sm:text-[30px] md:text-[40px] md:mt-2 sm:mt-4  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[500] drop-shadow-sm lg:w-[20%] w-full"
          >
           PracticeMania
          </h1>
            </div>
            <div className="md:w-[30%] sm:w-[90%] h-auto m-auto  bg-home/50 px-2 py-2  mt-10">
                <div className='flex justify-center flex-col m-auto'>
                <span className='flex justify-center'>
                  <IconActivationSVG height='10rem' width='10rem'></IconActivationSVG>
                </span>

               {
                loading ? <Skeleton></Skeleton>:
                <h1 className="text-center font-poppins font-[700] text-[25px]">{toastMsg}</h1>
               }

                <button className="px-3 py-3 bg-tahiti rounded-md text-white mt-5" type="submit"
                 onClick={handleSubmit}>Activate Account</button>
                </div>
                
            </div>
        </div>
    )

}
