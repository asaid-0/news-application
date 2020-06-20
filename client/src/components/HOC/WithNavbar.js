import React from 'react'
import Navbar from '../Navbar/Navbar';


const WithNavbar = (Component) => (props) => {
    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5">
                <Component {...props} />
            </div>
        </>
    )
}


export default WithNavbar;