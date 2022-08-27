import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div style={{ background: "#CA6F1E" }}>
        <div style={{ position: 'absolute', top: "50%", width: "100%", textAlign: "center" }}>
          <h1 >Page not found</h1>
          <h1>404</h1>
          <NavLink to='/'>
            <button type="button" class="btn btn-danger">Back to home</button>
          </NavLink>
     
        </div>
      </div>
    </>
  )
}

export default ErrorPage
