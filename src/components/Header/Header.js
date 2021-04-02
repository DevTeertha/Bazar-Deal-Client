import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { MyContext } from '../../App';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { signOut } from '../Firebase/FirebaseAuth';

const Header = () => {
    const { userState } = useContext(MyContext);
    const [user, setUser] = userState;
    const { isLoggedIn, name, img } = user;

    const signOutHandler = () => {
        signOut()
            .then(res => {
                const signOutUser = {
                    isLoggedIn: false,
                    name: "",
                    email: "",
                    img: ""
                }
                setUser(signOutUser);
                localStorage.clear();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="nav-container container-lg container-sm container-md">
            <Navbar className="row nav" expand="md">
                <Navbar.Brand className="text-info logo w-50 font-weight-bold"><Link to="/">BAZAR DEAL</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="nav-bar-menu" />
                <Navbar.Collapse id="nav-bar-menu" className="text-center bg-white">
                    <Nav className="font-weight-bold nav-menu">
                        <Nav.Link className="pt-3 pr-3">
                            <Link className="link" to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link className="pt-3 pr-3">
                            <Link className="link" to="/orders">Orders</Link>
                        </Nav.Link>
                        <Nav.Link className="pt-3 pr-3">
                            <Link className="link" to="/admin">Admin</Link>
                        </Nav.Link>
                        <Nav.Link className="pt-3 pr-3">
                            <Link className="link" to="/checkout">Checkout</Link>
                        </Nav.Link>
                        <Nav.Link className="pr-3">
                            {
                                isLoggedIn
                                    ?
                                    <Popup trigger={
                                        <div className="profile-frame">
                                            <img src={img} alt={name} />
                                        </div>
                                    } position="bottom">
                                        <div className="popup-profile text-center bg-light p-3">
                                            <img src={img} alt={name} />
                                            <h5 className="font-weight-bold text-dark"> {name} </h5>
                                            <button onClick={signOutHandler} className="btn btn-outline-dark w-100">Sign Out</button>
                                        </div>
                                    </Popup>
                                    :
                                    <Link className="login-link" to="/login">
                                        <button className="btn btn-info">Login</button>
                                    </Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;