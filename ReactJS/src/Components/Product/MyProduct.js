import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Edit_product from "./Edit_product";

function MyProduct(props) {

    const [getProduct, setProduct] = useState("");
    const local = localStorage.getItem("login");

    useEffect(() => {

        if (local) {
            const userData = JSON.parse(local);

            let url = "http://localhost/laravel/public/api/user/my-product";
            let accessToken = userData.data.success.token;
            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };
            axios
                .get(url, config)
                .then((res) => {
                    setProduct(res.data.data)
                    console.log(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    function handleDelete(e) {
        e.preventDefault();
        const newId = e.target.id

        if (local) {
            const userData = JSON.parse(local);

            let url = "http://localhost/laravel/public/api/user/delete-product/" + newId;
            let accessToken = userData.data.success.token;
            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };

            axios
                .get(url, config)
                .then((res) => {
                    setProduct(res.data.data)
                })
            alert("bạn đã xóa product")

        }

    }

    function renderProduct() {

        return Object.keys(getProduct).map((values, keys) => {

            let image = JSON.parse(getProduct[values].image)
            let id_user = getProduct[values].id_user
            let id_product = getProduct[values].id


            return (
                <tr key={keys}>
                    <th scope="row" >{getProduct[values].id}</th>
                    <td>{getProduct[values].name}</td>
                    <td>
                        <img className="image_product"
                            src={
                                "http://localhost/laravel/public/upload/user/product/" + id_user + "/" + image[0]
                            }
                            alt=""
                        />
                    </td>
                    <td>{getProduct[values].price}</td>
                    <td>

                        <Link className="btn btn-primary" to={"/user/editProduct/" +  id_product} >
                            Edit
                        </Link>
                        <button className="btn btn-primary" id={getProduct[values].id} onClick={handleDelete}> Delete </button>
                    </td>
                </tr>
            )
        })


    }

    return (

        <div className="col-sm-9 padding-right">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h3>Your Product</h3>
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {renderProduct()}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end Container fluid  */}
        </div>
    )

}
export default MyProduct;