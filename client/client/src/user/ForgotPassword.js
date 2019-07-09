import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { findUserByEmail, resetPasswordMail } from '../auth/index'

const ForgotPassword = () => {

    
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmedPassword: '',
        error: '',
        userId: '',
        isFoundUser: false,
        success: false
    })

    const { email,userId, error, success } = values
    


    const changeHandler = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })

    }


    const clickSubmit = e => {

        e.preventDefault()

        // console.log("mail= == ", email);

        setValues({
            ...values,
            error: false
        })


        findUserByEmail(email)
        .then(data => {
        
            console.log("data--", data.user._id);

            setValues({
                ...values,
                isFoundUser: true,
                success: true,
                userId: data.user._id 
            })
        })
    }

    const init = userId => {
        resetPasswordMail(userId)
            .then(data => {
            console.log("reset -- ", data);
            
        })
    }



    useEffect(() => {
        init(userId)
    }, [values])




    const emailInputForm = () => (
        <form  >
        <h4 className="mb-3">Forgot Password ?</h4>
            <div className="form-group">
                <label className="text-muted"  >Enter your email</label>
                <input
                    type="email"
                    className="form-control"
                    onChange={changeHandler('email')}
                    value={email}
                />
            </div>


            <button
                className="btn btn-success"
                onClick={clickSubmit}
            >Reset</button>
        </form>
    )




    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const emailSend = () => (
        <div className="alert alert-success">
            Please check your email. A reset mail sent on your email address. 
        </div>
    )




    return (
        
        <Layout
            title="Activation page"
            description="Activate Your Accoumnt"
            className="container col-md-8 offset-md-2 "
        >


            <div style={{ height: '500px', marginTop: '20px' }}>

                 {showError()}
                {
                    success ? emailSend() : emailInputForm()
                }
            </div>



        </Layout>
    )
}


export default  ForgotPassword