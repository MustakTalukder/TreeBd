import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage';
import moment, { updateLocale } from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'



const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {


    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)


    

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2" >
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }


    // const addToCart = () => {
    //     addItem(product, () => {
    //         setRedirect(true)
    //     })
    // }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton &&  (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        )
    }
    
    
    const showStock = (quantity) => {
        return quantity > 0
            ? (<span className="badge badge-primary badge-pill">In Stock</span>)
            : (<span className="badge badge-primary badge-pill">Out of Stock! we will add it soon. </span>)
    }


    const handleChange = productId => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)

        e.target.value > product.quantity && setCount(`${product.quantity}`)

        // if (e.target.value > product.quantity)
        // {
        //     setCount(e.target.quantity)
            
        // }
// work
        // setCount(e.target.value > product.quantity ? `${product.quantity}` :  )

        if (e.target.value >= 1) {

            updateItem(productId, e.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (cartUpdate && (
            <div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend" >
                        <span className="input-group-text" >Adjust Quantity</span>    
                    </div>

                    <input
                                
                                type="number"
                                className="form-control"
                                value={count}
                                onChange={handleChange(product._id)}
                    />
                    
                    {/* { 
                        product.quantity < product.count && removeItem(product._id)
                    } */}

                    {/* {
                        product.quantity < product.count
                            ? <input
                                
                                type="number"
                                className="form-control"
                                value={count}
                                onChange={handleChange(product._id)}
                            />
                            // : <input
                                
                            //     type="number"
                            //     className="form-control"
                            //     value={product.quantity}
                            //     onChange={handleChange(product._id)}
                            // />

                            // : <h4>Out of</h4>
                            
                    } */}



                    {/* {JSON.stringify(product.count)}
                    {JSON.stringify(product.quantity)} */}
                </div>
            </div>

            )
        )
        
    }


    return (
        
        <div className="card shadow">
            
            <div className="card-header name" >{product.name}</div>
        
            <div className="card-body">

                {shouldRedirect(redirect)}
                
                 
                <ShowImage item={product} url="product" />

                
                

                <p className="lead mt-2" >{product.description.substring(0, 100)}</p>
                
                <p className="black-10">${product.price}</p>
                
                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>

                <p className="black-8">
                    Added on {moment(product.createdAt).fromNow()}
                </p>

                <p className="black-9">
                    Available Product: {product.quantity}
                </p>

                
                {showStock(product.quantity)}
                <br/>
                        
                {showViewButton(showViewProductButton)} 
                
                { product.quantity > 0 && showAddToCart(showAddToCartButton)}        
                
                {showRemoveButton(showRemoveProductButton)}
                
                { showCartUpdateOptions(cartUpdate)}
                   

                </div>

            </div>

    )
}

export default Card


// /product/photo/:productId