import React, { useEffect, useState } from 'react'
// import OTPInput from 'react-otp-input'
import { useSelector } from 'react-redux';

export default function Gap({inputL,setGap,optw}) {
  const { visibility} = useSelector(
    (state) => state.fillgap
  );
  
  const styleClass={
    'height':'10px',
    'width':'100%',
    'margin-top':'8px',
  
  }
  const inputStyle={
    'height':'1.7rem',
    'width':'2rem',
    'background':'#F1F1F1',
     'padding-top':'8px',
     'padding-bottom':'10px',
     'padding-left':'8px',
     'padding-right':'8px',
     'border-radius':'5px',
     'text-transform':'lowercase',
     'pointer-events':visibility ?'none':'auto',
  
  }
  return (
    <div className='sm:text-[15px] md:text-[23px]'>
        {/* <OTPInput
        
        containerStyle={styleClass}
        inputStyle={inputStyle}
        value={optw}
        onChange={setGap}
        numInputs={inputL}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}>

        </OTPInput> */}
    </div>
  )
}
