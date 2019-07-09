import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment'


const Orders = () => {

    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues ] = useState([])

    const { user, token } = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                     setOrders(data)
                    console.log(data);
                    
                }
                
            })
        
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);

                } else {
                    setStatusValues(data)
                }
                
            })
        
    }

    
    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])


    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                // <h5 className="text-danger display-2" >Total Orders: {orders.length}</h5>
                <div className="col-12">

                    <h3 className="text-center mb-3 mt-5">Total Orders: {orders.length}</h3>
                    <hr/>
                </div>

            )
        } else {
            return <h1 className="text-danger" >No orders</h1>
        }
    }

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text" >
                    {key}
                </div>

            </div>

            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />

        </div>
    )


    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then(data => {
                if (data.error) {
                console.log('Status update failed');
                
                } else {
                    loadOrders()
                }
                
            })
        
        
    }


    const showStatus = (o) => (
        <div className="form-group" >
            <p>Status: {o.status}</p>

            <select
                className="form-control"
                onChange={(e) => handleStatusChange(e, o._id)}

            >
                <option>Update Status</option>
                {
                    statusValues.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ) )
                }
            </select>
        </div>
    )

    
    return (
    
        <Layout
            title="Dashboard"
            description={`G'day , you can manage all the orders`}
            className="container-fluid"
        >

            {/* <div className="row">
                
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}    
                    
                    {
                        orders.map((o, oIndex) => {
                            return (
                                <div
                                    className="mt-5"
                                    key={oIndex}
                                    style={{ borderBottom: "5px solid indigo" }}
                                >
                                    <h2 className="mb-5">
                                        <span className='bg-primary' >
                                            Order ID: {o._id}
                                        </span>
                                    </h2>

                                    <ul className="list-group mb-2">


                                        <li className="list-group-item">
                                            {showStatus(o)}
                                        </li>

                                        <li className="list-group-item" >
                                            Transaction ID: {o.transaction_id}
                                        </li>

                                        <li className="list-group-item" >
                                            Amount: {o.amount}
                                        </li>

                                        <li className="list-group-item" >
                                            Ordered by: {o.user}
                                        </li>

                                        <li className="list-group-item" >
                                            Ordered On: {moment(o.createdAt).fromNow()}
                                        </li>

                                        <li className="list-group-item" >
                                            Delivery Address: {o.address}
                                        </li>


                                    </ul>


                                    <h3 className="mt-4 mb-4 font-italic">
                                        Total Product in the order: {o.products.length}
                                    </h3>


                                    {
                                        o.products.map((p, pIndex) => (
                                            <div
                                                className="mb-4"
                                                key={pIndex}
                                                style={{
                                                    padding: "20px",
                                                    border: "1px solid indigo"
                                                }}
                                            >

                                                {showInput('Product name', p.name)}
                                                {showInput('Product price', p.price)}
                                                {showInput('Product total', p.count)}
                                                {showInput('Product Id', p._id)}
                                                 
                                            </div>
                                        ))
                                    }

                                </div>
                            )
                        })
                    }
                </div>
                
                
            </div> */}


            
            {showOrdersLength()}  
            

            <div className="row mb-5">
                <table class=" shadow table table-bordered table-success mb-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Time</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order, index) => (
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{order.user.name}</td>
                                    <td>
                                        {
                                            order.products.map((p, i) => (
                                                <li>{p.name}</li>
                                            ))
                                            
                                        }
                                    </td>


                                    <td>{moment(order.createdAt).fromNow()}</td>
                                    <td>
                                            
                                        {showStatus(order)}
                                            
                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                </table>
            </div>



            

        </Layout>
    )



}


export default Orders