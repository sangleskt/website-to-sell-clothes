import React from 'react';
import ErrorForm from "../Error/ErrorForm";
import axios from "axios";
import { useState } from "react";

function AddProduct(props) {
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState("");
    const [inputs, setInputs] = useState({
        category: '',
        brand: '',
        name: '',
        file: '',
        price: '',
        status: 1,
        sale: '',
        detail: '',
        company: '',
    });




    function hanldeInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs((state) => ({ ...state, [nameInput]: value }));

    }

    function hanldeFile(e) {
        const files = e.target.files;
        setFile(files)
        console.log(files)
    }
    


    function renderSale(e) {

        //parseInt chuyen string sang integer
        if (parseInt(inputs.status,10) === 0) {
            return (
                <div className="form-group col-md-12" >
                    <input type="number" id="value_sale" name="sale" onChange={hanldeInput} />%
                </div>
            )
        } else {
            return null
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errorSubmit = {};
        let flag = true;

        //category
        if (inputs.category.length === 0) {
            flag = false;
            errorSubmit.category = "vui lòng nhập category"
        }

        //brand
        if (inputs.brand.length === 0) {
            flag = false;
            errorSubmit.brand = "vui lòng nhập brand "
        }

        //name
        if (inputs.name.length === 0) {
            flag = false;
            errorSubmit.name = "vui lòng nhập name";
        }

        // upload ảnh
        if (file.length === 0) {
            flag = false;
            errorSubmit.file = "vui lòng chọn file";
        }
        else {
            
            Object.keys(file).map((values, keys) => {
                if (file[values].size > 1024 * 1024) {
                    flag = false;
                    errorSubmit.size = "file lớn hơn 1mb";
                }
                let names = file[values].name;
                let abc = names.split(".");
                let lists = ["png", "jpg", "jpeg", "PNG", "JPG"];
                let image = lists.includes(abc[1]);
    
                if (!image) {
                    flag = false;
                    errorSubmit.name = "file không phải file ảnh";
                }
            })

        }

        //price
        if (inputs.price.length === 0) {
            flag = false;
            errorSubmit.price = "vui lòng nhập price"
        }

        //status

        if (inputs.status === 0) {
            if (inputs.sale.length === 0) {
                flag = false;
                errorSubmit.sale = "vui lòng nhập sale "
            }
        }

        //detail
        if (inputs.detail.length === 0) {
            flag = false;
            errorSubmit.detail = "vui lòng nhập detail "
        }

        //company
        if (inputs.company.length === 0) {
            flag = false;
            errorSubmit.company = "vui lòng nhập company "
        }

        if (!flag) {
            setErrors(errorSubmit);
        } else {
            const local = localStorage.getItem("login");
            if (local) {
                const userData = JSON.parse(local);

                let url = "http://localhost/laravel/public/api/user/add-product";
                let accessToken = userData.data.success.token;
                let config = {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                };
                const formData = new FormData();
                formData.append("category", inputs.category);
                formData.append("brand", inputs.brand);
                formData.append("name", inputs.name);
                formData.append("price", inputs.price);
                formData.append("status", inputs.status);
                formData.append("sale", inputs.sale);
                formData.append("detail", inputs.detail);
                formData.append("company", inputs.company);

                Object.keys(file).map((values, keys) => {
                    formData.append("file[]", file[values]);
                })

                axios.post(url, formData, config).then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        alert("Add product thành công");
                    }
                    console.log(res);

                });

            }
        }
    }


    return (
        <div className="col-sm-9 padding-right">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header"><h3>Add Product</h3></div>
                    <br />
                    <div className="card-body">
                        <form id="main-contact-form" className="contact-form row" name="contact-form" onSubmit={handleSubmit}>

                            <div className="form-group col-md-12">
                                <select name="category" onChange={hanldeInput}>
                                    <option value>Please select category</option>
                                    <option value={1}>Category1</option>
                                    <option value={2}>Category2</option>
                                    <option value={3}>Category3</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <select name="brand" onChange={hanldeInput}>
                                    <option value>Please select brand</option>
                                    <option value={1}>Brand1</option>
                                    <option value={2}>Brand2</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" placeholder="Name" name="name" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12">
                                <input className="form-control" type="file" name="image" multiple onChange={hanldeFile} />
                            </div>

                            <div className="form-group col-md-12">
                                <input type="number" className="form-control" id="display" placeholder="Price" name="price" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12" >
                                <select name="status" onChange={hanldeInput}>
                                    <option value={1} selected >new</option>
                                    <option value={0}>sale</option>
                                </select>
                            </div>

                            {renderSale()}

                            <div className="form-group col-md-12">
                                <textarea id="detail" className="form-control" placeholder="Detail" name="detail" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12">
                                <input id="company_profile" className="form-control" placeholder="company" name="company" onChange={hanldeInput} />
                            </div>

                            <ErrorForm errors={errors} />

                            <div className="form-group col-md-12">
                                <input type="submit" className="btn btn-primary pull" name="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AddProduct;