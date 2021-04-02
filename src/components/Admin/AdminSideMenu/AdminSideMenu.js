import React from 'react';
import './AdminSideMenu.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';




const AdminSideMenu = () => {
    const manageIcon = <FontAwesomeIcon icon={faTasks} />
    const addIcon = <FontAwesomeIcon icon={faPlus} />
    const editIcon = <FontAwesomeIcon icon={faPen} />
    return (
        <Navbar className="admin-side-menu d-block" expand="sm">
            <Navbar.Toggle className="bg-white" aria-controls="side-nav-bar-menu" />
            <Navbar.Collapse id="side-nav-bar-menu" className="nav-collapse">
                <Nav className="d-block w-100">
                    <Navbar.Brand className="w-100" style={{ fontWeight: '700', fontSize: '2em' }}> <Link className='text-white bazar-logo-admin' to='/'><span className="d-xl-block d-lg-none d-md-none d-sm-none">BAZAR DEAL</span> <span className="d-xl-none d-lg-block d-md-block d-sm-block">BD</span> </Link> </Navbar.Brand>
                    <Link className='admin-link d-block' to='/admin/manageProduct'>{manageIcon} <span className="d-xl-inline d-lg-none d-md-none d-sm-none">Manage Product</span></Link>
                    <Link className='admin-link d-block' to='/admin/addProduct'>{addIcon} <span className="d-xl-inline d-lg-none d-md-none d-sm-none">Add Product</span> </Link>
                    <Link className='admin-link d-block' to='/admin/editProduct'>{editIcon} <span className="d-xl-inline d-lg-none d-md-none d-sm-none">Edit Product</span></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminSideMenu;