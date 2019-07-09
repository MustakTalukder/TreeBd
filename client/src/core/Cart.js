import React, {useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom'
import Card from './Card';
import { getCart } from './cartHelpers';
import Checkout from './Checkout';



const Cart = () => {

    const [items, setItems] = useState([])
    
    useEffect(() => {
        setItems(getCart())
    }, [items])


    const showItems = items => {
        return (
            <div >
                <h2>Your Cart has {`${items.length}`} items</h2>
                <hr />
                {
                    items.map((product, i) => (
                        <Card
                            key={i}
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                        />
                    ))
                }
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your cart is empty.
            <br />
            <Link to="/shop" >
            Continue Shopping</Link>
        </h2>
    )




    return (
        <Layout
            title="Shopping Cart"
            description="Manage ypur cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
        
            <div className="row mt-5" style={{marginBottom: '150px'}}  >
                <div className="col-md-6 col-sm-6 col-xs-12" >
                    {
                        items.length > 0
                            ? showItems(items)
                            : noItemsMessage()
                    }

                </div>


                <div className="col-md-6 col-sm-6 col-xs-12" >
                  <h2 className="mb-4" >Your cart Summary</h2>
                    <hr />
                    
                    <Checkout products={items} />

                    {/* {JSON.stringify(items)}  */}

                </div>


            </div>



        </Layout>
    )
}


export default Cart 