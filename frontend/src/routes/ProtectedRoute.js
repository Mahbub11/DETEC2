import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ShowNotification } from "../redux/actions";

export const ProtectedRoute = ({ children }) => {
    const {userInfo} =useSelector((state)=> state.auth)
    const dispatch= useDispatch()

    console.log(userInfo)

    // console.log(userInfo)
    if (!userInfo) {
      dispatch(ShowNotification({severity:'error',message:'Please Login First'}));
      // user is not authenticated
      return <Navigate to="/auth/signin" />;
    
    }
    return children;
  };