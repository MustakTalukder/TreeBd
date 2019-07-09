import React from 'react'
import { API } from '../Config'


const OrderImageShow = ({ item, url }) => (
    <div className="product-img d-flex justify-content-center  " style={{height: '30px', width: '100%', float: 'right'}} >
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3 "
            style={{ maxHeight: '100%', maxWidth: '100%' }} />

    </div>
)

export default OrderImageShow