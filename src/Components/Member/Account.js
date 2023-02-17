import axios from "axios";
import { useEffect, useState } from "react";
import ErrorForm from "../Error/ErrorForm";

function Account(props) {


    const [errors, setErrors] = useState({});
    const [file, setFile] = useState([]);
    const [avatar, setAvatar] = useState("");

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        country: '',
        level: 0,
    });

    useEffect(() => {
        const local = localStorage.getItem("login");
        if (local) {
            const userData = JSON.parse(local);
            const info = userData.data.Auth
            setInputs({
                name: info.name,
                email: info.email,
                password: info.password,
                phone: info.phone,
                address: info.address,
                avatar: info.avatar,
                country: info.country,

            })
        }
    }, [])


    function hanldeInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs((state) => ({ ...state, [nameInput]: value }));
    }

    function hanldeFile(e) {
        const file = e.target.files;

        //gui file len API
        let reader = new FileReader();

        reader.onload = (e) => {
            setAvatar(e.target.result); //gui qua API
            setFile(file[0]) // bo thong tin file upload vao file de xu li
        }
        reader.readAsDataURL(file[0])

    }

    function handleSubmit(e) {
        e.preventDefault();
        const local = localStorage.getItem("login");
        if (local) {
            const userData = JSON.parse(local);
            const info = userData.data.Auth

            console.log(info)

            let url = "http://localhost/laravel/public/api/user/update/" + info.id;
            let accessToken = userData.data.success.token;

            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            };

            const formData = new FormData();
            formData.append("name", inputs.name);
            formData.append("email", inputs.email);
            formData.append("password", inputs.password);
            formData.append("address", inputs.address);
            formData.append("avatar", inputs.avatar);
            formData.append("phone", inputs.phone);
            formData.append("country", inputs.country);
            axios
                .post(url, formData, config)
                .then((res) => {
                    console.log(res)
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        var convert = JSON.stringify(res)
                        localStorage.setItem('login', convert)
                        alert("Update thanh cong");
                    }
                })
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-5 ">
                    <div className="signup-form">
                        {/*sign up form*/}
                        <h2>Update User!</h2>
                        <form id="signup" action="#" onSubmit={handleSubmit}>
                            <input
                                className="name"
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={hanldeInput}
                                value={inputs.name}
                            />
                            <input
                                className="email"
                                type="email"
                                placeholder="Email"
                                name="email"
                                readOnly
                                value={inputs.email}
                            />
                            <input
                                className="password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={hanldeInput}
                                value={inputs.password}
                            />
                            <input
                                className="phone"
                                type="number"
                                placeholder="Phone"
                                name="phone"
                                onChange={hanldeInput}
                                value={inputs.phone}
                            />
                            <input
                                className="address"
                                type="text"
                                placeholder="Address"
                                name="address"
                                onChange={hanldeInput}
                                value={inputs.address}
                            />
                            <input
                                className="avatar"
                                type="file"
                                placeholder="Avatar"
                                onChange={hanldeFile}
                                name="avatar"
                            />
                            <select
                                className="form-control form-control-line"
                                value={inputs.country}
                                name="country"
                                onChange={hanldeInput}
                            >
                                <option value>Please select</option>
                                <option value={3}>vietnam</option>
                                <option value={4}>anh</option>
                                <option value={5}>phap</option>
                            </select>

                            <ErrorForm errors={errors} />

                            <button id="user" type="submit" className="btn btn-default">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Account;