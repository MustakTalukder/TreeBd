import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';

import Signup from './user/Signup'
import Signin from './user/Signin';
import Home from './core/Home';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import addCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ActivationPage from './user/ActivationPage';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword'
import ManageUsers from './admin/ManageUsers';
 

const Routes = () => {
    return (
        <div>
                    <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/forgotpassword" exact component={ForgotPassword} />
                <Route path="/activateaccount/:userId" exact component={ActivationPage} />
                <Route path="/resetpassword/:userId" exact component={ResetPassword} />

                {/* Private Routes */}
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/admin/products" exact component={ManageProducts} />

                {/* Admin Routes */}
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={addCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/users" exact component={ManageUsers} />


                <Route path="/product/:productId" exact component={Product} />
                
                <Route path="/cart" exact component={Cart} />
                

            </Switch>
        </BrowserRouter>
        </div>
    )
}

export default Routes