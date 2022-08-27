import React, { useEffect, useState } from 'react'
import profile from '../assest/profile2.jpg';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../slices/UserSlices';
import { SpinnerCircularFixed } from 'spinners-react';

import { useSelector, useDispatch } from 'react-redux';
const About = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userDetail);
  const login = useSelector((state) => state.user.login);

  console.log("🚀 ~ file: About.js ~ line 8 ~ About ~ userData", userData)

  useEffect(() => {
    dispatch(getUser()).then(() => setLoading(true))
    if (!login) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      { Loading ?
      
      <div className="container" >
        <form method='GET'>
          <div className="row pt-5">
            <div className="col-md-4 col-sm-6">
              <img src={userData.imageUrl} alt="raza" class="img-thumbnail" />
              <h6 className='mt-3'>Work Link</h6>
              <a href="https://github.com/abubakarraza64" style={{ textDecoration: 'none' }} target='blank'>GitHub</a>
            </div>
            <div className="col-md-6 col-sm-8 pt-5">
              <h2>{userData.name}</h2>
              <p style={{ color: "#41558C" }}>Web Developer</p>
              <div className="row mt-5 pt-5">
                <h2>About</h2>
                <div className="col-6">

                  <h5 className='mt-5'>User Id:</h5>
                  <h5 className='mt-3'>Name:</h5>
                  <h5 className='mt-3'>E-mail:</h5>
                  <h5 className='mt-3'>Phone:</h5>
                </div>
                <div className="col-6">
                  <h5 className='mt-5' style={{ color: "#41558C" }}>{userData._id}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.name}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.email}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.phone}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <button type="button" className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>
        </form>
      </div>
      :
      <div>
      <SpinnerCircularFixed style={{position:"absolute",top:"50%",width:"90px",right:"50%"}}   size={90} thickness={100} speed={100} color="rgba(57, 112, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
      </div>
    }

    </>
  )
}

export default About
