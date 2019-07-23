import React from 'react';
import Menu from './Menu';
import "../styles.css"
import FooterPart from './FooterPart';



const Layout = ({ title = 'Title', description = 'Description', className, children }) => (

    <div style={{position: 'relative', paddingBottom: '30px'}} >

        
         <Menu />    

        

        <div className="container">

            {/* <div className={className}>{children}</div> */}

            {children}
            
        </div>

        <FooterPart />

    </div>
)


export default Layout