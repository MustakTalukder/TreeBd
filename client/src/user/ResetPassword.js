import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Layout from '../core/Layout';
import queryString from 'query-string'
import { isResetAvailable, updateResetPassword } from '../auth/index'

const ResetPassword = (props) => {


    const userId = props.match.params.userId

    const { token } = queryString.parse(props.location.search)
    

    const [isReset, setIsReset] = useState({
        isReset: false
    })

    const [values, setValues] = useState({
        password: '',
        confirmedPassword: '',
        error: '',
        message: false,
        success: false
    })

    const {password, confirmedPassword, error, message} = values
    


    const changeHandler = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })

    }

 

    const init = (userId, token) => {

        isResetAvailable(userId, token)
            .then(data => {
                // console.log(data);

                setIsReset({
                    ...isReset,
                    isReset: data.isReset
                })

            })
        
    }


    useEffect(() => {
        init(userId, token)
    }, [])


    

    const updatePassword = e => {
        e.preventDefault()


        if (password !== confirmedPassword) {
           return setValues({
                ...values,
                error: "Password doesn't match",
            })
        }


        updateResetPassword({ userId, password, token })
            .then(data => {
                console.log("Update Pass", data);


                setValues({
                    ...values,
                    message: true
                })
                
            })


        
    }


    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )



    const ActivationMessage = () => (
        <div>
            <h3>Reset Password Completed.</h3>
            <span>Please <Link to="/signin">Sign In</Link> </span>
            
        </div>
    )

    const waintingMessage = () => {

        if (!message) {
            return <div >
                <h3>Please Check your Email. Active your account from your email.</h3>
            </div>
        } 
    }



    

    const newPasswordInputForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted"  >Enter your new Password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={changeHandler('password')}
                    value={password}
                />

                <label className="text-muted"  >Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={changeHandler('confirmedPassword')}
                    value={confirmedPassword}
                />
            </div>

            <button
                className="btn btn-primary"
                onClick={updatePassword}
            >submit</button>
        </form>
    )

    

    return (
        
        <Layout
            title="Password page"
            description="Reset Your Password"
            className="container col-md-8 offset-md-2 "
        >

            <div style={{ height: '500px', marginTop: '20px' }} >
                {showError()}

                {message ? ActivationMessage() : ''}

                { !message && isReset? newPasswordInputForm(): waintingMessage()}    
            </div>
            
            
        </Layout>
    )
}


export default  ResetPassword