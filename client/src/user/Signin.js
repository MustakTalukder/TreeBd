import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import Layout from '../core/Layout';

import { signin, authenticate } from '../auth/index'
import { isAuthenticated } from './../auth/index';


const SignIn = () => {


    const [values, setValues] = useState({
        email: 'admin@gmail.com',
        password: 'admin1',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = values;
    
    const { user } = isAuthenticated()




    const changeHandler = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })

    }




    const clickSubmit = e => {
        e.preventDefault()

        setValues({
            ...values,
            error: false,
            loading: true
        })

        signin({
            email,
            password
        })
        .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    })


                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,
                            loading: false
                        })
                    })
                }
        })

    }




    // const signInForm = () => (
    //     <form >

    //         <div className="form-group">
    //             <label className="text-muted"  >Email</label>
    //             <input
    //                 type="email"
    //                 className="form-control"
    //                 onChange={changeHandler('email')}
    //                 value={email}
    //             />
    //         </div>

    //         <div className="form-group">
    //             <label className="text-muted"  >Password</label>
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 onChange={changeHandler('password')}
    //                 value={password}
    //             />
    //         </div>

    //         <button
    //             className="btn btn-primary"
    //             onClick={clickSubmit}
    //         >Submit</button>

    //         <p><Link to="/forgotpassword">Forgot Password?</Link></p>


    //     </form>
    // )

    const signInForm = () => (

        <div className="row" style={{height: '600px'}}>

        <div style={{ width: "50%", margin: "0 auto", marginTop: '5%' }} >
            
            <div className="card shadow-lg p-3 mb-5 bg-white rounded "  >
                <h5 className="card-header info-color white-text bg-success text-center py-4" style={{color: "white"}}>
                    <strong>Sign in</strong>
                </h5>
            
                <div className="card-body px-lg-5 pt-0">
                    
                    <form className="text-center" style={{color: '#757575'}}>
                        
                        <div className="md-form">
                            
                            <label for="materialLoginFormEmail">E-mail</label>
                            <input
                                type="email"
                                id="materialLoginFormEmail"
                                className="form-control"
                                onChange={changeHandler('email')}
                                value={email}
                            />
                            
                            
                        </div>
                        

            
                        <div className="md-form">
                            
                        <label for="materialLoginFormPassword">Password</label>
                        
                            <input
                                type="password"
                                id="materialLoginFormPassword"
                                className="form-control"
                                onChange={changeHandler('password')}
                                value={password}
                            />
                            
                            
                        </div>
                        

                        <div className="d-flex justify-content-around">
                            
                            <div>
                            <Link to="/forgotpassword"><p>Forgot password?</p></Link>

                            </div>
                            
                        </div>
                        

            
                        <button
                            className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0"
                            onClick={clickSubmit}
                            type="submit"
                        >Sign in</button>

                        <p>Not a member?
                                    
                        <Link to="/signup"><p>Register</p></Link>
                            
                        </p>
                        


                </form>
            

            </div>

            </div>
            </div>
            
            </div>
        
    )




    const showError = () => (

        <div>
            <div style={{ width: "50%", margin: "0 auto", marginTop: '2%' }}>
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                    {error}
                </div>

            </div>
        </div>
    )


    const showLoading = () => (
        loading && (
            <div className="alert alert-info" >
                <h2>Loading... </h2>
            </div>
        )
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
           }
        }

        if (isAuthenticated()) {
            return <Redirect to="" />
        }
    }
    

    return (
        
        <Layout
            title="Sign In"
            description="Sign In in app"
            className="container"
        >

            
            <div>
            {showLoading()}

            {showError()}
            {signInForm()}
            {redirectUser()}
        </div>

            
        </Layout>
    )
}


export default  SignIn