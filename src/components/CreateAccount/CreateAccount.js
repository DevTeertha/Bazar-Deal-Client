import React, { useContext } from 'react';
import './CreateAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { MyContext } from '../../App';
import { signInWithGoogle } from '../Firebase/FirebaseAuth';

const CreateAccount = () => {
    const { userState } = useContext(MyContext);
    const [user , setUser] = userState;
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleIcon = <FontAwesomeIcon icon={faGoogle} />

    const loginWithGoogle = () => {
        signInWithGoogle()
            .then(res => {
                const { displayName, email, photoURL } = res;
                const loginUser = { ...user }
                loginUser.isLoggedIn = true;
                loginUser.name = displayName;
                loginUser.email = email;
                loginUser.img = photoURL;
                setUser(loginUser);
                history.replace(from);
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container">
            <div className="header-container">
                <Header></Header>
            </div>
            <div className="login-container w-50 p-3 mt-5">
                <div className="login-frame border p-4">
                    <h2 style={{ fontWeight: '600' }} className="mb-4">Create An Account</h2>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" id="name" name="name" type="text" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" id="email" name="email" type="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" name="password" type="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input className="form-control" id="password" name="password" type="password" />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-info w-100" type="submit">Create An Account</button>
                        </div>
                        <div className="form-group">
                            <p className="text-center">Already Have Account? <Link to="/login" className="text-info">Login</Link></p>
                        </div>
                    </form>
                </div>
                <div className="social-login p-4">
                    <p className="text-center">Or</p>
                    <button onClick={loginWithGoogle} className="google-btn w-100 btn btn-outline-info">{googleIcon} Continue With Google
                </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;