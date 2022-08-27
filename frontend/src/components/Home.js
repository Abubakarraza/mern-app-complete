import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getUser, logoutUser } from '../slices/UserSlices';
import { useDispatch, useSelector } from 'react-redux';
import CrudUI from './CrudUI';
import Card from './Card';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const name = useSelector((state) => state.user.userDetail.name);

  const login = useSelector((state) => state.user.login);
  console.log(login);
  const dispatch = useDispatch();
  // const [name,setName]=useState("");
  // const [check,setCheck]=useState(false);
  // const [Fname,setFname]=useState('');
  // const [Sname,setSname]=useState('');
  // const [Email,setEmail]=useState('');

  // const data =useSelector((state) => state.user.login);
  // console.log(data);

  // const onGetHandler = async () => {
  //   const res = await fetch("/getData", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",

  //     },credentials:"include"

  //   }).then((res)=>{})
  //   const data=await res.json();

  //   setName(data.name);
  //   setCheck(true)

  //   console.log("🚀 ~ file: Home.js ~ line 16 ~ onGetHandler ~ data", data)
  // }
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <div style={{ background: 'blue' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h1>
            {login ? (
              <>
                Welcome {name} <div>Here is Your Crud</div>
              </>
            ) : (
              <>
                <span>Welcome This is complete mern app</span>
                <h4>
                  Please <NavLink to={'/login'}> Login</NavLink> First
                </h4>
              </>
            )}
          </h1>
          {login && <CrudUI />}
          {/* <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-xs-12" > <Card/></div>
              <div className="col-lg-6 col-sm-6 col-xs-12"> <Card/></div>
            </div>
           </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
