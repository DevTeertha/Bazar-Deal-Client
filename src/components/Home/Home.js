import React, { useState, useContext } from 'react';
import './Home.css'
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import { css } from '@emotion/react';
import { DotLoader } from "react-spinners";
import { MyContext } from '../../App';
import { addToDatabaseCart } from '../../databaseManager';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = () => {
    const { loadState, productState , tempCartState } = useContext(MyContext);
    const [loading] = loadState;
    const [products] = productState;
    const [tempCart, setTempCart] = tempCartState;
    const [color] = useState("#5bc0de");

    const buyNowHandler = (product) => {
        const newTempCart = [...tempCart , product];
        setTempCart(newTempCart);
        const sameProduct = newTempCart.filter(pd=>pd._id===product._id);
        const quantity = sameProduct.length;
        addToDatabaseCart(product._id , quantity);
    }

    return (
        <div className="container-lg container-sm container-md">
            <div className="header-container">
                <Header></Header>
            </div>
            <div className="home-container">
                <div className="search-filed text-center py-5">
                    <input className="form-control search-input w-50 d-inline pl-4" style={{ height: '3.6em' }} type="text" placeholder="Search" name="search" />
                    <button className="btn btn-info mb-1 px-4 py-3">Search</button>
                </div>
                <div className="products-container">
                    {
                        loading ? <DotLoader color={color} css={override} size={130} />
                            :
                            <div className="row mx-auto">
                                {
                                    products.map(pd => <ProductCard buyNowHandler={buyNowHandler} key={pd._id} product={pd}></ProductCard>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;