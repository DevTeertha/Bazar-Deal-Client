import React, { useState, useContext } from 'react';
import './Addproduct.css';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { css } from '@emotion/react';
import { PulseLoader } from "react-spinners";
import { MyContext } from '../../../App';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const override = css`
  display: inline-block;
  margin: 0 auto;
  border-color: red;
`;

const AddProduct = () => {
    const { productState, loadState } = useContext(MyContext);
    const [products, setProducts] = productState;
    const [loading, setLoading] = loadState;
    const [imgLoad, setImgLoad] = useState(false);
    const [color] = useState("#161c2d");
    const [img, setImg] = useState("No Photo");
    const [imgURL, setImgURL] = useState(null);
    const { register, handleSubmit } = useForm();


    // Metarial UI SNACKBAR MESSAGE START
    const [open, setOpen] = React.useState(false);
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // Metarial UI SNACKBAR MESSAGE END

    const onSubmit = (data, e) => {
        if (img === ' ') {
            alert('Please Wait...')
        }
        else {
            const { productName, weight, price } = data;
            const uploadProduct = {
                productName: productName,
                weight: weight,
                price: price,
                imgURL: imgURL
            }
            const afterAddProduct = [...products, uploadProduct];
            setProducts(afterAddProduct);

            setLoading(true);
            fetch('https://warm-sea-45342.herokuapp.com/addProduct', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(uploadProduct)
            })
                .then(res => {
                    setImgURL('');
                    setImg('');
                    setLoading(false);
                    setOpen(true);
                    e.target.reset();
                })
                .catch(err => console.log(err))
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleImageUpload = (e) => {
        setImg(' ');
        setImgLoad(true);
        const imageData = new FormData();
        imageData.set('key', '1b13afeea921d1f7a1ed17c2503cbf55');
        imageData.append('image', e.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                setImgURL(res.data.data.display_url);
                setImg(res.data.data.title);
                setImgLoad(false);
            })
            .then(err => console.log(err))
    }
    return (
        <div>
            <h1 className="p-4" style={{ fontWeight: '700', fontSize: '2em' }}>Add Product</h1>

            <div className="p-4 bg-white border form mt-5">
                <Form className="row" onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group className="col-6 p-3">
                        <Form.Label className="font-weight-bold" htmlFor="product-name">Product Name</Form.Label>
                        <Form.Control id="product-name" name="productName" type="text" ref={register({ required: true })} />
                    </Form.Group>

                    <Form.Group className="col-6 p-3">
                        <Form.Label className="font-weight-bold" htmlFor="weight">Weight</Form.Label>
                        <Form.Control type="number" name="weight" ref={register({ required: true })} placeholder="g (Ex. 1700g)" />
                    </Form.Group>

                    <Form.Group className="col-6 p-3">
                        <Form.Label className="font-weight-bold" htmlFor="price">Price</Form.Label>
                        <Form.Control type="number" name="price" ref={register({ required: true })} placeholder="$" />
                    </Form.Group>

                    <Form.Group className="col-6 p-3">
                        <Form.Label className="font-weight-bold d-block" htmlFor="img-upload">Add Photo</Form.Label>
                        <Form.Label className="btn btn-outline-dark px-5" htmlFor="img-upload">Upload Photo</Form.Label>
                        {
                            imgLoad ?
                                <Form.Label className="px-3">
                                    Please Wait <PulseLoader color={color} css={override} size={10} />
                                </Form.Label>
                                :
                                <Form.Label className="px-3 text-info font-weight-bold">{img}</Form.Label>
                        }
                        <Form.Control className="d-none" id="img-upload" type="file" onChange={handleImageUpload} />
                    </Form.Group>

                    <Form.Group className="col-12">
                        {loading ?
                            <Button className="w-25" variant="info" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                        </Button>
                            :
                            <Button className="w-25 font-weight-bold" variant="info" type="submit">Save</Button>
                        }
                    </Form.Group>
                </Form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Product Uploaded Successfully
                        </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default AddProduct;