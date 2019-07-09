import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { createProduct, getCategory } from './apiAdmin';


const AddProduct = () => {

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

        description,
        price,

        categories,

        quantity,
        loading,
        error,
        createdProduct,

        formData
    } = values


    // Load categories and set form data

    const init = () => {
        getCategory().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error 
                })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }





    useEffect(() => {
        init()
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


        createProduct(user._id, token, formData)
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
                        createdProduct: data.name
                    })
                    
                }
                
            })
        

    }


    


    const newPostForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}  >

                <h4 className="text-center">Upload Product</h4>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('name')}
                    />
                    
                </div>
                
                
                <div className="form-group">
                    <label className="text-muted d-flex">Photo</label>
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


                <button className="btn btn-outline-primary">Create Product</button>


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
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-success" >
                <h2>Loading...</h2>
            </div>
        )
    )



    return (
        <Layout
        title="Add a new Product"
        description={`G'day ${user.name}, ready to add a new product`}
        >

            <div className="row">
                
                <div className="mt-5 mb-5" style={{ margin: 'auto', width: '50%', padding: '20px', borderLeft: '6px solid #28A745', background: '#F8F9FA' }}>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
                
            </div>
            

        </Layout>
    )
}

export default AddProduct