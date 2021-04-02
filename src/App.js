import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import AdminPanel from './components/Admin/AdminPanel/AdminPanel';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/Checkout/Checkout';


export const MyContext = createContext();


function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    img: ""
  });
  const [cart, setCart] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const [order, setOrder] = useState({
    email: "",
    productList: [],
    totalPrice: 0,
    date: ""
  });
  const [orderHistory , setOrderHistory] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localUser = { ...user }
    localUser.isLoggedIn = localStorage.getItem('isLoggedIn');
    localUser.name = localStorage.getItem('displayName');
    localUser.email = localStorage.getItem('email');
    localUser.img = localStorage.getItem('photoURL');
    setUser(localUser);
  }, [])

  useEffect(() => {
    setLoading(true);
    fetch('https://warm-sea-45342.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false);
      })
  }, [])


  return (
    <MyContext.Provider value={{
      userState: [user, setUser],
      productState: [products, setProducts],
      loadState: [loading, setLoading],
      cartState: [cart, setCart],
      tempCartState: [tempCart, setTempCart],
      orderState: [order, setOrder],
      orderHistoryState : [orderHistory , setOrderHistory]
    }}>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home></Home>
          </Route>

          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <AdminPanel></AdminPanel>
          </PrivateRoute>

          <PrivateRoute path="/checkout">
            <Checkout></Checkout>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/register">
            <CreateAccount></CreateAccount>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
