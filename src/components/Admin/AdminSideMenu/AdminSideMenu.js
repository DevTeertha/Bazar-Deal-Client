import React from 'react';
import './AdminSideMenu.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks , faPlus , faPen } from '@fortawesome/free-solid-svg-icons';




const AdminSideMenu = () => {
    const manageIcon = <FontAwesomeIcon icon={faTasks} />
    const addIcon = <FontAwesomeIcon icon={faPlus} />
    const editIcon = <FontAwesomeIcon icon={faPen} />
    return (
        <div>
            <h1 style={{fontWeight:'700'}}> <Link className='text-white bazar-logo-admin' to='/'>BAZAR DEAL</Link> </h1>
            <div className="admin-side-menu m-2 mt-4">
                <ul>
                    <li>
                        <Link className='admin-link' to='/admin/manageProduct'>{manageIcon} Manage Product</Link>
                    </li>
                    <li>
                        <Link className='admin-link' to='/admin/addProduct'>{addIcon} Add Product</Link>
                    </li>
                    <li>
                        <Link className='admin-link' to='/admin/editProduct'>{editIcon} Edit Product</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSideMenu;