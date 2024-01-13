import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveWord } from '../../redux/slices/disctionary'

export default function SenErrorContainer({data,senerror}) {

    const dispatch= useDispatch()
    const [serror,setserror]= useState(senerror)
    const [errorColor,setErrorColor] = useState(true)
    const [showSuggestion,setShowSuggestion] = useState(false)
    const [counter,setCounters] = useState(true)
    

    const handleCorrect=(val)=>{
        setErrorColor(false)
        setserror(val)
        setShowSuggestion(false)
        setCounters(false)

    }

    const handleWordSave=(word)=>{
        const data={
          flag:'s',
          data:word
        }
        dispatch(saveWord(data))
    
      }
 
  return (
    <div onMouseLeave={()=>setShowSuggestion(false)}>
        <h1 onMouseEnter={()=>setShowSuggestion(true)} className={`${errorColor ? 'border-red-500 text-red-600 border-b-[2px]':''}  
        cursor-pointer`}>{serror}</h1>
        <div className={`${showSuggestion && counter?'block':'hidden'}`}>
            <div className='h-auto w-[25%]  absolute px-2 font-poppins z-50 text-[18px]'>
                <div className='border-[2px] px-2 py-2 h-full w-full bg-gray-100 rounded-md flex flex-col gap-2'>

                    <h1 className='text-[18px]'>*Possible {data.type} mistake found.</h1>
                    <p className='text-red-500 line-through'>{data.bad}</p>
                    <div className=''>
                        <h1 className='underline text-[18px] font-[500]'>Descriptions:</h1>
                        <p className='text-[15px]'>{data.description.en}</p>
                        

                    </div>

                    <div>
                        <h1 className=' font-[500] underline'>Suggestioin:</h1>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {
                                data.better.map(val=>{
                                    return(
                                        <div>
                                            <h1 onClick={()=>handleCorrect(val)} 
                                            className={`${val.length ===0? 'px-2 bg-red-500 line-through':''} bg-blue-300 px-1 
                                            cursor-pointer py-1 rounded-md text-gray-700`}>{val.length===0? data.bad: val}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                       <div>
                        {
                            data.description.en.includes('spelling') ? 
                             <button onClick={()=>handleWordSave(data?.better[0])} className='px-1 py-1 text-[13px] mt-3 flex justify-center text-white bg-[#3AB7BF] rounded-md'>Add to Spell-Check</button>
                            :''
                        }
                       </div>
                    </div>

                </div>

            </div>
        </div>
        {/* <div>
            <p onClick={()=> setserror(data.better[0])}>{data.description.en}</p>
        </div> */}
    </div>
  )
}
