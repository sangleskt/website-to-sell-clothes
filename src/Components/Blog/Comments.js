import React from 'react';
import axios from "axios";
import { useState } from "react";
import ErrorForm from "../Error/ErrorForm";

function Comments(props) {
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});

    // console.log(props.replays)

    function hanldeText(e) {
        const value = e.target.value;
        setComment(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const local = localStorage.getItem("login");

        if (local) {
            const userData = JSON.parse(local);
            let url =
                "http://localhost/laravel/public/api/blog/comment/" + props.idBlog;
            let accessToken = userData.data.success.token;

            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };
            if (comment) {
                const formData = new FormData();
                formData.append("id_blog", props.idBlog);
                formData.append("id_user", userData.data.Auth.id);
                formData.append("id_comment", props.replays);
                formData.append("comment", comment);
                formData.append("image_user", userData.data.Auth.avatar);
                formData.append("name_user", userData.data.Auth.name);

                axios.post(url, formData, config).then((res) => {
                    console.log(res);
                    props.getComment([res.data.data]);

                });
            } else {
                let errorSubmit = {};

                errorSubmit.comment = "vui lòng nhập";
                setErrors(errorSubmit);
            }
        } else {
            alert("Vui long dang nhap");
        }
    }

    return (
        <div className="replay-box" >
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea
                            className="comments"
                            name="message"
                            rows={11}
                            defaultValue={""}
                            onChange={hanldeText}
                        />
                        <ErrorForm errors={errors} />
                        <a className="btn btn-primary" onClick={handleSubmit} href>
                            post comment
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Comments;
