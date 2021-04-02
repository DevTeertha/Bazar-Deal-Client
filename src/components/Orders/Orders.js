import React, { useContext, useEffect } from 'react';
import './Orders.css';
import { Table } from 'react-bootstrap';
import Header from '../Header/Header';
import { MyContext } from '../../App';

const Orders = () => {
    const { cartState, orderHistoryState } = useContext(MyContext);
    const [orderHistory, setOrderHistory] = orderHistoryState;
    const [cart] = cartState;
    const { _id } = cart;
    const email = localStorage.getItem('email');
    useEffect(() => {
        fetch(`http://localhost:5000/order?email=${email}`)
            .then(res => res.json())
            .then(data => setOrderHistory(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="container">
            <div className="header-container">
                <Header></Header>
            </div>
            <div className="orders-container">
                <h1 className="my-5 font-weight-bold text-center">Orders Summary</h1>
                <div className="table-container p-4 bg-white border form mt-5">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Your Orders</th>
                                <th>Total Price</th>
                                <th>Date <span style={{ color: 'gray', fontWeight: '100' }}> (dd/mm/yyy)</span></th>
                            </tr>
                        </thead>
                        {
                            orderHistory.length === 0 ?
                                <tbody className="p-5 text-center">
                                    <tr>
                                        <td style={{ fontSize: '2em', fontWeight: '600' }} className="p-5" colSpan="3"> No Orders </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    {
                                        orderHistory.map(order =>
                                            <tr key={order._id}>
                                                <td> {order.productList.map(list => <span> [ {list} ] <br /></span>)} </td>
                                                <td> $ {order.totalPrice} </td>
                                                <td> {order.date} </td>
                                            </tr>)
                                    }
                                </tbody>
                        }
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default Orders;