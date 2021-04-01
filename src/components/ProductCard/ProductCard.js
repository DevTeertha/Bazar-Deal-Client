import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductCard = (props) => {
    const { productName, price, imgURL } = props.product;
    const buyNowHandler = props.buyNowHandler;

    return (
        <div className="col-4 p-3">
            <Card style={{ height: '33em' }}>
                <Card.Img variant="top" src={imgURL} />
                <Card.Body>
                    <Card.Title className="font-weight-bold" style={{ fontSize: '1.8em', textAlign: 'center' }}> {productName} </Card.Title>
                </Card.Body>
                <div className="row my-3 text-center">
                    <div className="col-6">
                        <span style={{ fontSize: '1.5em' }}>${price}</span>
                    </div>
                    <div className="col-6">
                        <Link to='/checkout'>
                            <Button onClick={() => buyNowHandler(props.product)} variant="info">Buy Now</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductCard;