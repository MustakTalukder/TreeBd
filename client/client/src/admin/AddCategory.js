import React, {useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin';


const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    // Destructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()

        setError('')
        setSuccess(false)

        // make request to api to create Category
        createCategory(user._id, token, { name })
            .then(data => {

                if (data.error) {
                    setError(data.error)
                
                } else {
                    setError('');
                    setSuccess(true);
                    
                }

                
                
        })


    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted" >Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                />

            </div>

            <button
                className="btn btn-outline-primary"
            >
                Create Category
            </button>

        </form>
    )



    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>
        }

    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () => {
        return (
            <div className="mt-5" >
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        )

    }


    return (
    
            <Layout
                title="Dashboard"
                description={`G'day ${user.name}, ready to add a new category`}
                className="container-fluid"
            >

                <div className="row mt-5">
                    
                    <div className="col-md-8 offset-md-2 " style={{marginBottom: '300px'}} >
                        {showSuccess()}
                        {showError()}
                        {newCategoryForm()}
                        {goBack()}
                    </div>
                    
                </div>
                

            </Layout>
        )


}

export default AddCategory