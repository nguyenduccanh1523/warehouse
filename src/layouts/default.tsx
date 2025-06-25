import React from 'react'


//settingoffCanvas

import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


const Default = () => {

    return (
        <>
            <div className="home-page">
                <Header />
                <div className="main-content">
                    {/* <div id="content-page" className="content-page"> */}
                    {/* <DefaultRouter/> */}
                    <Outlet />
                    {/* </div> */}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Default
