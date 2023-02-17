import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
    const [products, setProducts] = useState("")

    useEffect(() => {
        axios
            .get("http://localhost/laravel/public/api/product")
            .then((res) => {
                setProducts(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(products)

    function renderProduct(e) {

        if (products.length > 0) {

            return products.map((value, key) => {
                let image = JSON.parse(value.image)
                return (
                    <div key={key} className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost/laravel/public/upload/user/product/" + value.id_user + "/" + image[0]} alt="" />
                                    <h2>{value.price}</h2>
                                    <p>{value.name}</p>
                                    <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{value.price}</h2>
                                        <p>{value.name}</p>
                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li>
                                        <Link to={"/product/detail/" + value.id}>
                                            <i className="fa fa-plus-square">Detail Product</i>
                                        </Link>
                                    </li>
                                    <li>
                                    <Link to="">
                                            <i className="fa fa-plus-square">Add to compare</i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                )
            })
        }

    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>

                {renderProduct()}

            </div>

        </div>
    );
}
export default Home;
