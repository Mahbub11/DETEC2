import { createAction } from "@reduxjs/toolkit";


export const ShowNotification= createAction('ShowNotification',({severity,message})=>({

    payload:{
        severity,
        message
    },
    
}));

export const CloseNotification= createAction('CloseNotification');
export const ToggleBlury= createAction('ToggleBlury');
export const ForceBlurFalse= createAction('ForceBlurFalse');
export const ReFetch= createAction('RefetchData');


