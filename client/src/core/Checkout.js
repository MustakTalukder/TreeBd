import React, {useState, useEffect } from 'react';
import { getBraintreeClientToken, processPayment, createOrder } from "./apiCore"
import { emptyCart } from './cartHelpers'
import { isAuthenticated } from './../auth/index';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react' 




const Checkout = ({ products }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: false,
        instance: {},
        address: ''
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(data => {
                if (data.error) {
                    setData({
                        ...data,
                        error: data.error 
                    })
                    
                } else {
                    setData({

                        clientToken: data.clientToken
                    })
                }
                
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])




    const handleAddress = e => {
        setData({
            ...data,
            address: e.target.value 
        })
    }



    const getTotal = () => {
        return (
            products.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price
            }, 0)
        )
    }


    const showCheckout = () => {
        return (
            isAuthenticated()
            ? (
                <div>{showDropIn()}</div>
                
            )
            : (
                <Link to="/signin">
                    <button className="btn btn-primary" >Sign in to Checkout</button>
                </Link>
            )
        )
    }

    let deliveryAddress = data.address

    const buy = () => {
        //Send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
               
                nonce = data.nonce

                // once you nonce (card type, card number ) send nonce as 'paymentMethodNonce
                // and also total to charged

                // console.log('Send nonce and total to process: ', nonce, getTotal(products));
                
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products) 
                }

                processPayment(userId, token, paymentData)
                    .then(response => {


                        // empty cart
                        //create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address:  deliveryAddress
                        }

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log("Payment success and empty cart");
                                })
                                setData({
                                    success: true
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                setData({
                                    loading: false 
                                })
                                
                            })
                        
                    })
                    .catch(error => console.log(error))


            })
            .catch(error => {
              //  console.log('Dropin error: ', error);
                setData({
                    ...data,
                    error: error.message
                })
                
            })
    }



    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: ""}) } >
            {
                data.clientToken !== null && products.length > 0
                    ? (
                        <div>

                            <div className="gorm-group mb-3" >
                                <label className="text-muted">Delivery Address:</label>
                                <textarea
                                    onChange={handleAddress}
                                    className="form-control"
                                    value={data.address}
                                    placeholder="Type your delivery address here ... "
                                />

                            </div>



                            <DropIn
                                options={{
                                    authorization: data.clientToken
                                    // paypal: {
                                    //     flow: "vault"
                                    // }
                                }}
                                onInstance={instance => (data.instance = instance)}
                            />

                            <button onClick={buy} className="btn btn-success btn-block">
                                Pay
                            </button>
                        </div>

                    )
                    : null
                    
            }
        </div>
    )


    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >
            {error}
        </div>
    )



    const showSuccess = success => (
        <div
            className="alert alert-danger"
            style={{ display: success ? '' : 'none' }}
        >
            Thanks! Your payment was successful!
        </div>
    )





    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}

        </div>
    )
}


export default Checkout
