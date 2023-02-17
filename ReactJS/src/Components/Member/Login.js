import axios from "axios";
import { useState } from "react";
import ErrorForm from "../Error/ErrorForm";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState([]);

    const navigate = useNavigate();


    function hanldeInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs((state) => ({ ...state, [nameInput]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: inputs.email,
            password: inputs.password,
            level: 0

        }
        console.log(data);
        axios
            .post("http://localhost/laravel/public/api/login", data)
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    console.log(res);
                    var convert = JSON.stringify(res)
                    localStorage.setItem('login', convert)
                    alert("dang nhap thanh cong");
                    navigate('/')
                }
            })

    }


    return (
        <div className="login-form">
            {/*login form*/}
            <h2>Login to your account</h2>
            <form id="signin" action="#" onSubmit={handleSubmit}>
                <input
                    className="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={hanldeInput}
                />
                <input
                    className="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={hanldeInput}
                />
                <ErrorForm errors={errors} />
                <span>
                    <input type="checkbox" className="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                    Login
                </button>
            </form>
        </div>
    );

}
export default Login;