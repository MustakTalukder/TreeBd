import React, { useState } from 'react';
import Layout from '../core/Layout';

import { signup } from '../auth/index'


const Signup = () => {


    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values




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
            error: false
        })

        signup({
            name,
            email,
            password
        })
        .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    })


                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
        })

    }


    // const signUpForm = () => (
    //     <form >
    //         <div className="form-group">
    //             <label className="text-muted"  >Name</label>
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 onChange={changeHandler('name')}
    //                 value={name}
    //             />
    //         </div>

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


    //     </form>
    // )


    const signUpForm = () => (

        <div style={{ width: "70%", height: "550px", margin: "0 auto", marginTop: '10%' }} >
     
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        
            <h5 className="card-header info-color white-text text-center py-4  bg-success" style={{color: "white"}} >
                <strong>Sign up</strong>
            </h5>
        
    
            <div className="card-body px-lg-5 pt-0">
        
              
                <form className="text-center"  style={{color: "#757575"}} >
        
                  
                    <div className="md-form mt-0">
                        <label for="materialRegisterFormEmail">Name</label>
                        <input
                            type="text"
                            id="materialRegisterFormEmail"
                            className="form-control"
                            onChange={changeHandler('name')}
                            value={name}
                        />
                    </div>
                  
                    <div className="md-form mt-0">
                        <label for="materialRegisterFormEmail">E-mail</label>
                        <input
                                type="email"
                                id="materialRegisterFormEmail"
                                className="form-control"
                                onChange={changeHandler('email')}
                                value={email}
                            />
                    </div>
        
        
                    <div className="md-form">
                        <label for="materialRegisterFormPassword">Password</label>
                        <input
                                type="password"                              
                                id="materialRegisterFormPassword"
                                className="form-control"                              
                                aria-describedby="materialRegisterFormPasswordHelpBlock"
                                onChange={changeHandler('password')}
                                value={password}
                        />
                        <small id="materialRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                            At least 6 characters.
                        </small>
                    </div>
        
        
       
                    <button
                            className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0" 
                            type="submit"
                            onClick={clickSubmit}
                        >Sign up</button>

                </form>
             
        
            </div>
        
            </div>
            
        </div>
        
    )



    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const showSuccess = () => (
        <div className="alert alert-info mt-5 mb-5" style={{display: success ? '' : 'none'}}>
            New Account is created.A verification email send your email.Please activate your account from email.
            Please check your Inbox and SPAM box also.
        </div>
    )
    

    

    return (
        
        <Layout
            title="Signup"
            description="Sign up in app"
            className="container col-md-8 offset-md-2 "
        >

            <div className="mt-5 mb-5">
                {showSuccess()}
                {showError()}

                {success ? '' : signUpForm()}


            </div>
            
        </Layout>
    )
}


export default Signup 