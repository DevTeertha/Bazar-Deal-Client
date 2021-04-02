import React from 'react';
import './AdminPanel.css';
import {
    Switch,
    Route
} from "react-router-dom";
import AdminSideMenu from '../AdminSideMenu/AdminSideMenu';
import ManageProduct from '../ManageProduct/ManageProduct';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';

const AdminPanel = () => {
    return (
        <div className="row admin-container">
            <div className="side-menu-container col-xl-3 col-sm-2 text-center p-4">
                <AdminSideMenu></AdminSideMenu>
            </div>
            <div className="admin-home-container col-xl-9 col-sm-10">
                <Switch>
                    <Route exact path="/admin">
                        <ManageProduct></ManageProduct>
                    </Route>

                    <Route path="/admin/manageProduct">
                        <ManageProduct></ManageProduct>
                    </Route>

                    <Route path="/admin/addProduct">
                        <AddProduct></AddProduct>
                    </Route>

                    <Route path="/admin/editProduct">
                        <EditProduct></EditProduct>
                    </Route>

                </Switch>
            </div>
        </div>
    );
};

export default AdminPanel;