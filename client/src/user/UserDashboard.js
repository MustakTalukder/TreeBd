import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import moment from 'moment'




const Dashboard = () => {

    const [history, setHistory] = useState([])

    const { user: { _id, name, email, role } } = isAuthenticated()

    const token = isAuthenticated().token

    const init = (userId, token) => {
        getPurchaseHistory(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setHistory(data)
                }
            })
    }


    useEffect(() => {
        init(_id, token) 
    }, [])


    
    const userLinkStyle = {
        background: 'linear-gradient(to bottom, #00cc66 0%, #99ff99 100%)'
    }

    const sidebar = {
        background: 'linear-gradient(to bottom, #00cc99 0%, #00cc66 100%)'
    }

    const userLinks = () => {
        return (
            // <div className="card" >
            //     <h4 className="card-header" >User Links</h4>
            //     <ul className="list-group" >
            //         <li className="list-group-item">
            //             <Link
            //                 className="nav-link"
            //                 to="/cart"
            //             >My Cart</Link>
            //         </li>
                    
            //         <li className="list-group-item">
            //             <Link
            //                 className="nav-link"
            //                 to={`/profile/${_id}`}
            //             >Update Profile</Link>
            //         </li>
            //     </ul>
            // </div>


           



            <div className="card mb-3 text-center">
                <div className="card-header font-weight-bold text-white" style={{background: '#048755'}}><i className="fas fa-user-circle mr-1"></i>{name}</div>
                
                <div className="card-body" style={sidebar}>

                    <ul className="list-group"  >
                        <li className="list-group-item font-weight-bold "style={sidebar} >
                            <Link
                                className="nav-link font-weight-bold text-white"
                                
                                to="/cart"
                            >My Cart</Link>
                        </li>
                        
                        <li className="list-group-item font-weight-bold" style={sidebar}>
                            <Link
                                className="nav-link font-weight-bold text-white"
                                to={`/profile/${_id}`}
                            >Update Profile</Link>
                        </li>
                    </ul>
                </div>
                
            </div>

        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header text-black" style={userLinkStyle} >User Information</h3>
                
                <ul className="list-group" >
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        )
    }
 


    const purchaseHistory = (history) => {
        return (
            <div className="card mb-5" >
                <h3 className="card-header text-black"  style={userLinkStyle} >Purchase History</h3>
                <ul className="list-group" >
                    <li className="list-group-item">
                        {
                            history.map((h, i) => {
                                return (
                                    <div>
                                        <hr />
                                        {/* {JSON.stringify(h.createdAt)} */}
                                        {
                                            
                                            h.products.map((p, i) => {
                                                return (
                                                    
                                                    <div key={i} >
                                                        <h6>Name: {p.name}</h6>
                                                        <h6>Price: ${p.price}</h6>
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        <h6>Purchased date: {" "} { moment(h.createdAt).fromNow() }</h6>
                                    </div>
                                )
                            })
                        }
                    </li>

                </ul>
            </div>
        )
    }




    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}`}
            className="container-fluid"
        >

            

            <div className="row" style={{ marginTop: '20px', marginBottom: '10px'}}>
                
                <div className="col-3">
                    {userLinks()}
                </div>
                
                


                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
                
            </div>
            








        </Layout>
    )
}


export default Dashboard;