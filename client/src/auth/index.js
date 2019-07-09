
import { API } from '../Config';


export const signup = (user) => {

 
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })

        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
}



export const signin = (user) => {
    // console.log(name, email, password);


    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })

        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
}



export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}



export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()

        return fetch(`${API}/signout`, {
            method: "GET"
            })
            .then(response => {
            console.log("signout", response);
            
            })
            .catch(err => console.log(err))
    }
}




export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false 
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}







export const activateAccount = (userId, token) => {

    return fetch(`${API}/user/activateaccount/${userId}?token=${token}`, {
        method: 'GET',

    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
}


export const isResetAvailable = (userId, token) => {

    return fetch(`${API}/user/resetavailable/${userId}?token=${token}`, {
        method: 'GET',

    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
}




export const findUserByEmail = (email) => {

    return fetch(`${API}/userbyemail/${email}`, {
        method: 'GET'

    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            
        })
    
    
}



export const resetPasswordMail = (userId) => {

    // const { _id } = user

    console.log("rr-", userId);
 
    return fetch(`${API}/user/resetpasswordmail/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
        // ,
        // body: JSON.stringify(user)

    })

        .then(response => {
        
        return response.json();
    })
    .catch(err => {
        console.log(err);
        
    })
    
}

export const updateResetPassword = (user) => {


    const { userId, token } = user

    // console.log("userId- ", userId);
    // console.log("token- ", token);

    return fetch(`${API}/user/password/update/${userId}?token=${token}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    
}

