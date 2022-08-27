import React, { useState } from 'react';
import validator from 'validator';
import { SpinnerCircularSplit } from "spinners-react"
import { NavLink, useNavigate } from 'react-router-dom';
import { BsEnvelopeFill, BsKeyFill } from 'react-icons/bs';
import { signinUser } from '../slices/UserSlices';
import { useDispatch, useSelector } from 'react-redux';

const Signin = () => {
  const state = useSelector((state) => state.user.loading);;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onClickHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert('please type all fields')
    };
    if (!validator.isEmail(email)) {
      return alert("please type valid email")
    };
    dispatch(signinUser({ email, password })).then((res) => {

      console.log("🚀 ~ file: Signin.js ~ line 25 ~ dispatch ~ res", res)
      if (res.payload.status == 200) {
        window.alert("User is Successfully Login");

        navigate("/")
      }
      else {
        window.alert("invalid Crediential");

      }
    })



  }
  return (
    <>
      {/* {message} */}
      {/* {error} */}
      <section className="vh-100" style={{ backgroundColor: '' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LogIn</p>

                      <form method='POST' className="mx-1 mx-md-4">



                        <div className="d-flex flex-row align-items-center mb-4">
                          <BsEnvelopeFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <BsKeyFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" autoComplete='off' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>
                        <div style={{marginBottom:"90px"}}>

                          {state &&
                            <SpinnerCircularSplit style={{ position: "absolute", left: "20%", width: "40px" }} size={40} thickness={100} speed={100} color="rgba(67, 57, 172, 1)" />

                          }
                        </div>



                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={onClickHandler}>LOGIN</button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger" >
                            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/register'><span >Create new</span> </NavLink>
                          </button>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></>
  )
}

export default Signin
