import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';



const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {
            color: '#ff9900'
        }
    } else {
        return {
            color: '#ffffff'
        }
    }
}





    // const { user } = isAuthenticated()

    

    // console.log(user.name);
    


const Menu = ({ history }) => (
    
    <div style={{  position: 'sticky', top: '0', zIndex: '1000', width: '100%' }} >

            
        <ul className="nav nav-tabs justify-content-center " style={{ background: '#048755' }}>

            <li className="nav-item " >
                <Link
                    className="nav-link"
                    style={isActive(history, '/')}
                    to="/"
                >Home</Link>
            </li>

            <li className="nav-item" >
                <Link
                    className="nav-link"
                    style={isActive(history, '/shop')}
                    to="/shop"
                >Shop</Link>
            </li>


            <li className="nav-item" >
                <Link
                    className="nav-link"
                    style={isActive(history, '/cart')}
                    to="/cart"
                >
                    <i className="fas fa-cart-arrow-down" style={{ marginRight: '4px' }}></i>
                    Cart{" "}
                    <sup>
                        <small className="cart-badge text-white" >{itemTotal()}</small>
                    </sup>
                </Link>
            </li>


            {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item" >
                    <Link
                        className="nav-link"
                        style={isActive(history, '/user/dashboard')}
                        to="/user/dashboard"
                    >Dashboard</Link>

                </li>

            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item" >
                    <Link
                        className="nav-link"
                        style={isActive(history, '/admin/dashboard')}
                        to="/admin/dashboard"

                    >Dashboard</Link>

                </li>

            )} */}


            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item" >
                        <Link
                            className="nav-link"
                            style={isActive(history, '/signin')}
                            to="/signin"
                        >Signin</Link>
                    </li>
                    <li className="nav-item" >
                        <Link
                            className="nav-link"
                            style={isActive(history, '/signup')}
                            to="/signup"
                        >Signup</Link>
                    </li>
                </Fragment>
            )}



            {/* User Name */}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item" >
                        <Link
                            className="nav-link"
                            style={isActive(history, '/user/dashboard')}
                            to="/user/dashboard"
                        ><i className="fas fa-user-circle mr-1"></i>{isAuthenticated().user.name}</Link>

                    </li>

                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item" >
                        <Link
                            className="nav-link"
                            style={isActive(history, '/admin/dashboard')}
                            to="/admin/dashboard"

                        ><i className="fas fa-user-circle mr-1"></i>{isAuthenticated().user.name}</Link>

                    </li>

                )}
            

            {/* End User Name */}




            {isAuthenticated() && (
                    <li className="nav-item" >
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#ffffff'}} 
                            onClick={() => signout(() => {
                                history.push('/');
                            })}
                        >
                        Signout</span>
                    </li>
            ) }

            </ul>
            
    </div>
)


export default withRouter(Menu)