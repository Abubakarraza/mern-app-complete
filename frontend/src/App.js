
import React,{useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {userData} from './slices/UserSlices'
import { useSelector,useDispatch } from "react-redux";
import Routing from "./routing/Routing";
function App() {
  const dispatch=useDispatch();
  const store =useSelector((store)=>store.user.data)
  console.log(store);
  useEffect(()=>{
    dispatch(userData());
  },[])
  return ( 
    <>
      {/* Routing */}

      <Routing />

   

    </>
  );
}

export default App;
