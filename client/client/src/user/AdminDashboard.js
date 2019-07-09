import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'


const AdminDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()

    const cardBar = {
        background: 'linear-gradient(to bottom, #00cc66 0%, #99ff99 100%)'
    }

    const sidebar = {
        background: 'linear-gradient(to bottom, #00cc99 0%, #00cc66 100%)'
    }

    const adminLinks = () => {
        return (
            <div className="card text-center" >
                <h4 className="card-header text-white" style={{background: '#048755'}} ><i className="fas fa-user-circle mr-1"></i>{name}</h4>
                <ul className="list-group" >
                    <li className="list-group-item" style={sidebar}>
                        <Link
                            className="nav-link text-white"
                            to="/create/category"
                        >Create Category</Link>
                    </li>
                    
                    <li className="list-group-item" style={sidebar}>
                        <Link
                            className="nav-link text-white"
                            to="/create/product"
                        >Create Product</Link>
                    </li>
                    
                    <li className="list-group-item" style={sidebar}>
                        <Link
                            className="nav-link text-white"
                            to="/admin/orders"
                        >View Orders</Link>
                    </li>
                    
                    <li className="list-group-item" style={sidebar}>
                        <Link
                            className="nav-link text-white"
                            to="/admin/products"
                        >Manage Products</Link>
                    </li>

                    <li className="list-group-item" style={sidebar}>
                        <Link
                            className="nav-link text-white"
                            to="/admin/users"
                        >Manage User</Link>
                    </li>


                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header text-black" style={cardBar} >Admin Information</h3>
                
                <ul className="list-group" >
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
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

            

            <div className="row mt-5" style={{height: '500px'}} >
                
                <div className="col-3">
                    {adminLinks()}
                </div>
                
                

                <div className="col-9">
                    {adminInfo()}
                </div>
                
            </div>
            


        </Layout>
    )
}


export default AdminDashboard;