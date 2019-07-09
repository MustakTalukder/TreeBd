import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import { getProducts, getProduct, deleteProduct } from './apiAdmin'
import OrderImageShow from './../core/OrderImageShow';


const ManageProducts = () => {

    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                    setProducts(data)
                    console.log(data);
                    
                }
            })
    }



    const destroy = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                    loadProducts()
                }
            })
    }





    useEffect(() => {
        loadProducts()
    }, [])


    return (
        <Layout
            title="Manage Product"
            description="Perform CRUD on Products"
            className="container-fluid"
        >


            <div className="row mb-5 mt-5" >
                <div className="col-12" >
                    <h2 className="text-center">Total {products.length} Products </h2>
                    <hr/>
                    <ul className="list-group">
                        {
                            products.map((p, i) => (
                                <li
                                    key={i}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div className="col-1"  >

                                    <OrderImageShow item={p} url="product" />

                                    </div>
                                    <div className="col-3"  >

                                        <strong>{p.name}</strong>

                                    </div>

                                    {/* {JSON.stringify(p)} */}

                                    <div className="col-2">

                                        <Link to={`/admin/product/update/${p._id}`} >

                                            <span className="badge badge-warning badge-pill" >
                                                Update
                                            </span>

                                        </Link>

                                    </div>

                                    <div className="col-2"  >

                                     <strong>Available: {p.quantity}</strong>

                                    </div>

                                    <div  className="col-2">
                                    
                                        <span onClick={() => destroy(p._id)} className="badge badge-danger badge-pill" >
                                            Delete
                                        </span>

                                    </div>
                                    
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div>


        </Layout>

    )

}


export default ManageProducts