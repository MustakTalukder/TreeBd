import React from 'react';
import Menu from './Menu';
import "../styles.css"
import FooterPart from './FooterPart';



const Layout = ({ title = 'Title', description = 'Description', className, children }) => (
    <div >

        
         <Menu />    

        

        <div className="container">

        <div className={className}>{children}</div>
        </div>

        <FooterPart />

    </div>
)


export default Layout