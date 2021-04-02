import React, { useContext } from 'react';
import './ManageProduct.css'
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../../../App';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ManageProduct = () => {
    const { productState } = useContext(MyContext);
    const [products, setProducts] = productState;

    const [open, setOpen] = React.useState(false);
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const productDeleteHandler = (id) => {
        fetch(`https://warm-sea-45342.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const afterDelete = products.filter(pd => pd._id !== id);
                setProducts(afterDelete);
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
        <div>
            <h1 className="p-4" style={{ fontWeight: '700', fontSize: '2em' }}>Manage Product</h1>

            <div className="table-container p-4 bg-white border form mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(pd => {
                                const { _id, productName, weight, price } = pd;
                                return (
                                    <tr key={_id}>
                                        <td> {productName} </td>
                                        <td> {weight}g </td>
                                        <td> ${price} </td>
                                        <td>
                                            <button className="btn btn-success mx-1 my-2"> <FontAwesomeIcon icon={faPen} /> </button>
                                            <button onClick={() => productDeleteHandler(_id)} className="btn btn-danger mx-1 my-2"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Successfully Deleted
                        </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default ManageProduct;