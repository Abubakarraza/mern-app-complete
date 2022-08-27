import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser,getUser } from '../slices/UserSlices';
const Logout = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    // const onLogoutHandler = async () => {
    //     try {
    //         const res = await fetch("/logout", {
    //             method:"GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",

    //             },
    //             credentials: "include"
    //         });
    //         // const data = await res.json();
    //         console.log(res)
    //         if (res.status !== 200) {
    //             const error = new Error("Something went wrong")
    //             throw error;
    //         }
    //         if (res.status === 200) {
    //             window.alert("user is Successfully Logout");
    //             navigate("/login")

    //         }
    //     } catch (error) {
    //         window.alert("Something Went Wrong Please Try Again");
    //         navigate("/")
    //     }

    // };
    useEffect(() => {
        dispatch(logoutUser()).then((res)=>{
            if(res.payload.status == 200){
                
               

            }
        });
        dispatch(getUser());
        window.location.reload(false)
        navigate("/login")
    })

    return (
        <></>
    )
}

export default Logout
