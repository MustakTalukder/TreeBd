import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Layout from '../core/Layout';
import queryString from 'query-string'
import { activateAccount } from '../auth/index'

const ActivationPage = (props) => {


    const userId = props.match.params.userId

    const { token } = queryString.parse(props.location.search)

    const [isActivated, setIsActivated] = useState({
        isActivated: false
    })

 
    const init = (userId, token) => {

        activateAccount(userId, token)
            .then(data => {
                // console.log(data);

                setIsActivated({
                    ...isActivated,
                    isActivated: data.isActivated
                })


                // console.log(isActivated);
                
                
            })
        
    }


    useEffect(() => {
        init(userId, token)
    }, [])


    const ActivationMessage = () => (
        <div>
            <h3>Activation Completed.</h3>
            <span>Please <Link to="/signin">Sign In</Link> </span>
            
        </div>
    )

    const waintingMessage = () => (
        <div>
            <h3>Please Check your Email. Active your account from your email.</h3>
        </div>
    )


    

    return (
        
        <Layout
            title="Activation page"
            description="Activate Your Accoumnt"
            className="container col-md-8 offset-md-2 "
        >


            <div className="mt-5 mb-5" style={{height: '400px'}}>
                {isActivated ? ActivationMessage() : waintingMessage() }
            </div>

        </Layout>
    )
}


export default  ActivationPage