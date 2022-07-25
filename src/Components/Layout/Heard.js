import React from 'react';
import './../../App.css';
import { Link, useNavigate } from "react-router-dom";

function Heard(props) {

    const navigate = useNavigate();

    const local = localStorage.getItem("account")



    function renderLogin() {
        function changeName(e) {

            if (local) {
                JSON.parse(local)
                window.localStorage.removeItem("account");
                navigate('/login')
            }

        }
        if (local) {
            JSON.parse(local)
            return (
                <li onClick={changeName}><a><i className="fa fa-lock" /> logout</a></li>
            )
        }
        else {
            return (
                <li><Link to={"login"}><i className="fa fa-lock"/>Login</Link></li>

            )
        }
    }



    function renderAccount() {
        const local = localStorage.getItem("login")


        if (local) {
            JSON.parse(local)
            return (
                <li><a href="/user/Account"><i className="fa fa-user" /> Account</a></li>
            )
        } else {
            return (
                <li></li>
            )
        }
    }




    return (

        <header>{/*header*/}
            <div className="header_top">{/*header_top*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><a href="abc"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                                    <li><a href="abc"><i className="fa fa-envelope" /> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="abc"><i className="fa fa-facebook" /></a></li>
                                    <li><a href="abc"><i className="fa fa-twitter" /></a></li>
                                    <li><a href="abc"><i className="fa fa-linkedin" /></a></li>
                                    <li><a href="abc"><i className="fa fa-dribbble" /></a></li>
                                    <li><a href="abc"><i className="fa fa-google-plus" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header_top*/}
            <div className="header-middle">{/*header-middle*/}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <a href="/"><img src="images/home/logo.png" alt="" /></a>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a href>Canada</a></li>
                                        <li><a href>UK</a></li>
                                    </ul>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a href>Canadian Dollar</a></li>
                                        <li><a href>Pound</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    {renderAccount()}
                                    <li><a href><i className="fa fa-star" /> Wishlist</a></li>
                                    <li><a href="checkout"><i className="fa fa-crosshairs" /> Checkout</a></li>
                                    <li><a className="payment" href="cart"><i className="fa fa-shopping-cart" /> Cart</a></li>
                                    {renderLogin()}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header-middle*/}
            <div className="header-bottom">{/*header-bottom*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><a href="/" className="active">Home</a></li>
                                    <li className="dropdown"><a href="abc">Shop<i className="fa fa-angle-down" /></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="product">Products</a></li>
                                            <li><a href="product-details">Product Details</a></li>
                                            <li><a href="checkout">Checkout</a></li>
                                            <li><a href="cart">Cart</a></li>
                                            <li><a href="login">Login</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><a href="blog/list">Blog<i className="fa fa-angle-down" /></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="blog/list">Blog List</a></li>
                                            <li><a href="blog-single">Blog Single</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="404">404</a></li>
                                    <li><a href="contact-us">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header-bottom*/}
        </header>
    )
}
export default Heard