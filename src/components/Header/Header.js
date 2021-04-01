import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { MyContext } from '../../App';

const Header = () => {
    const { userState } = useContext(MyContext);
    const [user, setUser] = userState;
    const { isLoggedIn, name, img } = user;

    const signOutHandler = () => {
        const signOutUser = {
            isLoggedIn: false,
            name: "",
            email: "",
            img: ""
        }
        setUser(signOutUser);
        localStorage.clear();
    }

    return (
        <div className="nav-container">
            <nav className="row nav">
                <div className="col logo">
                    <a className="text-info" href="/">BAZAR DEAL</a>
                </div>
                <div className="col nav-menu">
                    <ul className="font-weight-bold">
                        <li>
                            <Link className="link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="link" to="/orders">Orders</Link>
                        </li>
                        <li>
                            <Link className="link" to="/admin">Admin</Link>
                        </li>
                        <li>
                            <Link className="link" to="/checkout">Checkout</Link>
                        </li>
                        <li>
                            {
                                isLoggedIn
                                    ?
                                    <Popup trigger={
                                        <div className="profile-frame">
                                            <img src={img} alt={name} />
                                        </div>
                                    } position="bottom">
                                        <div className="popup-profile text-center">
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
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;