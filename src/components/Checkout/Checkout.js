import React, { useContext, useEffect } from 'react';
import './Checkout.css';
import { Table } from 'react-bootstrap';
import Header from '../Header/Header';
import { MyContext } from '../../App';
import { getDatabaseCart } from '../../databaseManager';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Checkout = () => {
    const { cartState, productState, orderState } = useContext(MyContext);
    const [cart, setCart] = cartState;
    const [order, setOrder] = orderState;
    const [products] = productState;

    const getDateAndTime = () => {
        const dateObject = new Date();
        const currentDate = dateObject.toLocaleDateString();
        const currentTime = dateObject.toLocaleTimeString();
        const currentDateAndTime = currentDate + "\t" + currentTime;
        return currentDateAndTime;
    }

    const productPrice = (price, quantity) => {
        const convertPrice = parseFloat(price);
        const Price = convertPrice.toFixed(2);
        const inTotalPrice = Price * quantity;
        return inTotalPrice;
    }

    const grandTotal = cart.reduce((total, prd) => {
        const inTotal = productPrice(prd.price, prd.quantity);
        return total + inTotal;
    }, 0);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const keys = Object.keys(savedCart);

        const cartProduct = keys.map(key => {
            const product = products.find(pd => pd._id === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProduct);

    }, [])

    const [open, setOpen] = React.useState(false);
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();


    const placeOrderHandler = () => {
        const email = localStorage.getItem('email');
        const newOrder = { ...order };
        cart.map(pd => {
            newOrder.productList.push(pd.productName);
        })
        newOrder.email = email;
        newOrder.totalPrice = grandTotal;
        newOrder.date = getDateAndTime();
        setOrder(newOrder);

        fetch('http://localhost:5000/placeOrder', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
            .then(res => {
                setOrder({
                    email: "",
                    productList: [],
                    totalPrice: 0,
                    date: ""
                });
                setCart([]);
                sessionStorage.clear();
                setOpen(true);
            })
            .catch(err => console.log(err))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div className="container">
            <div className="headers-container">
                <Header></Header>
            </div>
            <div className="deals-container">

                <h1 className="my-5 font-weight-bold">Checkout</h1>
                <div className="table-container p-4 bg-white border form mt-5">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>In Total</th>
                            </tr>
                        </thead>
                        {
                            cart.length === 0
                                ?
                                <tbody className="p-5 text-center">
                                    <tr>
                                        <td style={{ fontSize: '2em', fontWeight: '600' }} className="p-5" colSpan="4">No Item</td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    {
                                        cart.map(pd => <tr key={pd._id}>
                                            <td> {pd.productName}</td>
                                            <td> {pd.quantity} </td>
                                            <td> ${pd.price} </td>
                                            <td> ${productPrice(pd.price, pd.quantity)} </td>
                                        </tr>)
                                    }
                                </tbody>
                        }
                        <tfoot>
                            <tr>
                                <th colSpan="2">Grand Total </th>
                                <th colSpan="2"> ${grandTotal} </th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Your Order Has Been Successfully Placed
                        </Alert>
                    </Snackbar>
                    <div className="place-button text-right">
                        <button onClick={placeOrderHandler} className='btn btn-info'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;