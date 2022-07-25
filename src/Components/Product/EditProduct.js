import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorForm from "../Error/ErrorForm";

function EditProduct(props) {

    let params = useParams();

    const local = localStorage.getItem("login");
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState("");
    const [inputs, setInputs] = useState({
        category: '',
        brand: '',
        name: '',
        price: '',
        status: '',
        sale: '',
        detail: '',
        company: '',
        file: '',
    });

    useEffect(() => {

        if (local) {
            const userData = JSON.parse(local);

            let url = "http://localhost/laravel/public/api/user/product/" + params.id;
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
                    setInputs(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);
    function hanldeInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs((state) => ({ ...state, [nameInput]: value }));

    }

    function hanldeFile(e) {
        const files = e.target.files;
        setFile(files)
        // console.log(files)
    }


    function handleSubmit(e) {
        e.preventDefault();

            if (local) {
                const userData = JSON.parse(local);

                let url = "http://localhost/laravel/public/api/user/edit-product/" + params.id;
                let accessToken = userData.data.success.token;
                let config = {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                };
                const formData = new FormData();
                formData.append("category", inputs.id_category);
                formData.append("brand", inputs.id_brand);
                formData.append("name", inputs.name);
                formData.append("price", inputs.price);
                formData.append("status", inputs.status);
                formData.append("sale", inputs.sale);
                formData.append("detail", inputs.detail);
                formData.append("company", inputs.company);

                Object.keys(file).map((values, keys) => {
                    formData.append("file[]", file[values]);
                })


                axios
                .post(url, formData, config).then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        alert("Update product thành công");
                    }
                    console.log(res);

                });

            }


    }

    function renderSale(e) {

        //parseInt chuyen string sang integer
        if (parseInt(inputs.status,10) === 0) {
            return (
                <div className="form-group col-md-12" >
                    <input type="number" id="value_sale" name="sale" onChange={hanldeInput} value={inputs.sale}/>%
                </div>
            )
        } else {
            return null
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header"><h3>Edit Product</h3></div>
                    <br />
                    <div className="card-body">
                        <form id="main-contact-form" className="contact-form row" name="contact-form" onSubmit={handleSubmit}>

                            <div className="form-group col-md-12">
                                <select name="category"   >
                                    <option value>Please select category</option>
                                    <option value={1}>Category1</option>
                                    <option value={2}>Category2</option>
                                    <option value={3}>Category3</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <select name="brand" onChange={hanldeInput}  >
                                    <option value>Please select brand</option>
                                    <option value={1}>Brand1</option>
                                    <option value={2}>Brand2</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    onChange={hanldeInput}
                                    value={inputs.name}
                                />
                            </div>

                            <div className="form-group col-md-12">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="display"
                                    placeholder="Price"
                                    name="price"
                                    onChange={hanldeInput} 
                                    value={inputs.price}
                                    />
                            </div>

                            <div className="form-group col-md-12" >
                                <select name="status" onChange={hanldeInput} value={inputs.status}   >
                                    <option value={1}>new</option>
                                    <option value={0}>sale</option>
                                </select>
                            </div>

                            {renderSale()}

                            <div className="form-group col-md-12">
                                <textarea
                                    id="detail"
                                    className="form-control"
                                    placeholder="Detail"
                                    name="detail"
                                    onChange={hanldeInput} 
                                    value={inputs.detail}
                                    />
                            </div>

                            <div className="form-group col-md-12">
                                <input 
                                    id="company_profile"
                                    className="form-control"
                                    placeholder="company"
                                    name="company"
                                    onChange={hanldeInput} 
                                    value={inputs.company}
                                    />
                            </div>

                            <div className="form-group col-md-12">
                                <input
                                    className="form-control"
                                    type="file"
                                    name="image"
                                    multiple
                                    onChange={hanldeFile} />
                            </div>

                            {/* <div className="col-sm-12">
                                <div className="view-product">
                                    <h4>Choose image you want to delete</h4>
                                    <div className style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="imageProduct"
                                            style={{ width: '75px', height: '75px' }} src="" alt="" />
                                        <input
                                            type="checkbox"
                                            name="image_delete[]"
                                            style={{ position: 'absolute', top: '3px', right: '3px' }} />
                                    </div>
                                    <div className style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="imageProduct"
                                            style={{ width: '75px', height: '75px' }} src="" alt="" />
                                        <input
                                            type="checkbox"
                                            name="image_delete[]"
                                            style={{ position: 'absolute', top: '3px', right: '3px' }} />
                                    </div>
                                    <div className style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="imageProduct"
                                            style={{ width: '75px', height: '75px' }} src="" alt="" />
                                        <input
                                            type="checkbox"
                                            name="image_delete[]"
                                            style={{ position: 'absolute', top: '3px', right: '3px' }} />
                                    </div>
                                </div>
                            </div> */}

                            <ErrorForm errors={errors} />

                            <div className="form-group col-md-12">
                                <input
                                    type="submit"
                                    className="btn btn-primary pull"
                                    name="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default EditProduct;