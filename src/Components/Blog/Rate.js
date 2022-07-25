import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

function Rate(props) {
    const [rating, setRating] = useState(0);

    function changeRating(newRating, Name) {
        setRating(newRating);

        const local = localStorage.getItem("login");

        if (local) {
            const userData = JSON.parse(local);
            let url = "http://localhost/laravel/public/api/blog/rate/" + props.idBlog;
            let accessToken = userData.data.success.token;

            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };

            const formData = new FormData();
            formData.append("blog_id", props.idBlog);
            formData.append("user_id", userData.data.Auth.id);
            formData.append("rate", newRating);

            axios.post(url, formData, config).then((res) => {
                console.log(res);
            });
        } else {
            alert("Vui long dang nhap");
        }
    }
    useEffect(() => {
        axios
            .get("http://localhost/laravel/public/api/blog/rate/" + props.idBlog)
            .then((res) => {
                let tong = 0;
                let data = res.data.data;
                data.map((value, key) => {
                    let num = value.rate;
                    tong += parseInt(num);
                });
                let ketQua = tong / data.length;
                setRating(ketQua)

                // console.log(ketQua)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <StarRatings
            rating={rating}
            starRatedColor="yellow"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
        />
    );
}
export default Rate;
