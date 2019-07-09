
import { API } from '../Config';


export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);


    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },

        body: JSON.stringify(category)
    })

        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
}




export const createProduct = (userId, token, product) => {
    // console.log(name, email, password);


    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}` 
        },

        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
        
    })
    
}



export const getCategory = () => {
    
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}


export const listOrders = (userId, token) => {
    
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}` 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}


export const getStatusValues = (userId, token) => {
    
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}` 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}




export const updateOrderStatus = (userId, token, orderId, status) => {
    
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({status, orderId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}



/**
 * to perform crud on product
 * get all product
 * get a single product
 * update single product
 * deletes single product
 */


 

export const getProducts = () => {
    
    return fetch(`${API}/products?limit=undefined`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}








export const deleteProduct = (productId, userId, token) => {
    
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}` 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}



 

export const getProduct = (productId) => {
    
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}








export const updateProduct = (productId, userId, token, product) => {
    
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}




export const getUsers = () => {
    
    return fetch(`${API}/allusers`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}



export const deleteUser = (deletedUserId, token) => {

    console.log("front user Id", deletedUserId);
    
    
    return fetch(`${API}/user/remove/${deletedUserId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}` 
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}


export const updateUserAction = (token, emailId, action) => {
    
    return fetch(`${API}/update/${emailId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({emailId, action})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}
