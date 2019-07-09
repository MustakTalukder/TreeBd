import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';

import { getUsers, deleteUser, updateUserAction } from './apiAdmin'



const ManageUsers = () => {

    const [users, setUsers] = useState([])

    const { user, token } = isAuthenticated()


    // const [values, setValues] = useState({
    //     action: '',
    //     email: ''
    // })

    // const { action, email } = values

    const loadUsers = () => {
        getUsers()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                    setUsers(data)
                }
                console.log("dta", data);
                
            })
    }



    const destroy = deleteUserId => {

        console.log("manage User", deleteUserId);
        console.log("manage User token", token);
        

        deleteUser(deleteUserId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                    loadUsers()
                }

                console.log(data);
                
            })
    }




    const actionHandler = (e) => {
        let action = e.target.value
        let email = e.target.name

        updateUserAction(token, email, action)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    
                } else {
                    loadUsers()
                }

                // console.log(data);
                
            })

    }





    useEffect(() => {
        loadUsers()
    }, [])


    return (
        <Layout
            title="Manage Product"
            description="Perform CRUD on Products"
            className="container-fluid"
        >


 
              <div className="row mb-5 mt-5" >
                  <div className="col-12" >
                      <h2 className="text-center">Total {users.length} User </h2>
                      <hr/>
                      <ul className="list-group">
                          {
                            users.map((p, i) => (
                                user.email !== p.email
                                &&
                                <li
                                    key={i}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >

                                    <div className="col-3"  >

                                        <strong>{p.name}</strong>

                                    </div>
                                    <div className="col-3"  >

                                        <strong>{p.email}</strong>

                                    </div>


                                    <div>
                                
                                        {
                                            p.role === 0
                                                ? <button
                                                    value="1"
                                                    name={`${p.email}`}
                                                    onClick={actionHandler}
                                                    className="btn btn-success"
                                                >Make Admin</button>
                                                
                                                : <button
                                                    value="0"
                                                    name={`${p.email}`}
                                                    onClick={actionHandler}
                                                    className="btn btn-secondary"
                                                >Make User</button>
                                        }
                                    
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


export default ManageUsers