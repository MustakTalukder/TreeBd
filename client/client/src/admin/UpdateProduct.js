import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import {  Redirect } from 'react-router-dom'
import { getProduct, getCategory, updateProduct } from './apiAdmin';


const UpdateProduct = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })


    const { user, token } = isAuthenticated()

    const {
        name,
        description,
        price,

        categories,

        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values



    const init = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {

                    // populate the state
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category,
                        shipping: data.shipping,
                        quantity: data.quantity,
                        formData: new FormData()
                    })
                    // load categories

                    initCategories()
                    
                }
            })
    }

    // Load categories and set form data

    const initCategories = () => {
        getCategory().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error 
                })
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }





    // useEffect(() => {
    //     init(match.params.productId)
    //    // console.log(values);

    // })
    
    useEffect(() => {
        init(match.params.productId)
       // console.log(values);

    }, [])



    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value) 

        setValues({
            ...values,
            [name]: value
        })
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({
            ...values,
            error: '',
            loading: true 
        })  


        updateProduct( match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error 
                    })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        error: false,
                        redirectToProfile: true,
                        createdProduct: data.name
                    })
                    
                }
                
            })
        

    }


    


    const newPostForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}  >
                
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange('photo')}
                        />
                    </label>
                </div>

                
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('name')}
                        value={name}
                    />
                    
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                        className="form-control"
                        onChange={handleChange('description')}
                        value={description}
                    />
                    
                </div>

                <div className="form-group">
                    <label className="text-muted">price</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange('price')}
                        value={price}
                    />
                    
                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select
                        onChange={handleChange('category')}
                        className="form-control"
                    >
                        <option>Please Select</option>
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id} >{c.name}</option>
                        ))}
                    </select>
                    
                </div>


                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select
                        onChange={handleChange('shipping')}
                        className="form-control"
                    >
                        <option>Please Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>

                    </select>
                    
                </div>


                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange('quantity')}
                        value={quantity}
                    />
                    
                </div>


                <button className="btn btn-outline-primary">Update Product</button>


            </form>
        )
    }


    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-danger" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-success" >
                <h2>Loading...</h2>
            </div>
        )
    )


    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />
            }
        }
    }



    return (
        <Layout
        title="Add a new Product"
        description={`G'day ${user.name}, ready to add a new product`}
        >

            <div className="row">
                
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
                
            </div>
            

        </Layout>
    )
}

export default UpdateProduct