import React from 'react';
import '../App.css'
import { Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Contact from '../components/Contact';
import Register from '../components/Register';
import Signin from '../components/Signin';
import About from '../components/About';
import ErrorPage from '../components/ErrorPage';
import Logout from '../components/Logout';

const Routing = () => {
    return (
        <>

            <Navbar />



            <Routes>
                <Route path="/contact" element={<Contact />}>

                </Route>
                <Route path="/register" element={<Register />}>

                </Route>
                {/* <Route path="/login" element={<Login />}>

</Route> */}
                <Route path='/login' element={<Signin />}>

                </Route>
                <Route exact path="/" element={<Home />}>

                </Route>
                <Route path="/contact" element={<Contact />}>

                </Route>
                <Route path="/about" element={<About />}>

                </Route>
                <Route path="/logout" element={<Logout />}>

                </Route>
                <Route path='*' element={<ErrorPage/>}> </Route>

            </Routes>
        </>
    )
}

export default Routing
