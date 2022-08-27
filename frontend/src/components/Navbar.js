import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo1 from '../assest/cover.png';
import { useSelector } from 'react-redux';
import '../App.css'
export default function Navbar() {
    const login = useSelector((state) => state.user.login);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to='/'>
                        <img src={logo1} alt="/raza" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {login ?
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0 left_navlinks" style={{ marginLeft: 'auto' }}>
                                <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/about'>About Us</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/contact'>ContactUs</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/logout' onClick={()=>window.alert("Are you sure you want to logout")}>Logout</NavLink>
                            </li>
                            </ul> :
                             <ul className="navbar-nav ml-auto mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>
                                  <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/'>Home</NavLink>
                                </li> 
                                <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/about'>About Us</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/contact'>ContactUs</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/login'>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeclassName="nav-link active" style={{textDecoration:"none",marginLeft:"12px"}} to='/register'>Register</NavLink>
                            </li>
                             </ul>
                          }
                        {/* <ul className="navbar-nav ml-auto mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>

                            <li className="nav-item">
                                <NavLink className="nav-link active" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" to='/about'>About Us</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link active" to='/contact'>ContactUs</NavLink>
                            </li>
                          
                          

                        </ul> */}

                    </div>
                </div>
            </nav>
        </>
    )
}
