
import axios from "axios";
import { useState } from "react";
import ErrorForm from "../Error/ErrorForm";

function Register(props) {

    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState([]);
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");

    function hanldeInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs((state) => ({ ...state, [nameInput]: value }));
    }
    function hanldeFile(e) {
        const file = e.target.files;

        // gui file len api server
        let reader = new FileReader();

        reader.onload = (e) => {
            setAvatar(e.target.result); //gui qua API
            setFile(file[0]); // bo thong tin file upload vao file de xu li
        };
        reader.readAsDataURL(file[0]);
    }
    
    function handleSubmit(e){
        e.preventDefault();

        let errorSubmit = {};
        let flag = true;

        //name
        if (inputs.name === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng nhập name";
        }

        if (inputs.email === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng nhập email";
        }

        if (inputs.password === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng nhập password";
        }

        if (inputs.phone === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng nhập phone";
        }

        if (inputs.address === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng nhập address";
        }

        if (inputs.file === "") {
            flag = false;
            errorSubmit.name = "vui lòng chọn file";
        }else{
            if (file.size > 1024 * 1024) {
                flag = false;
                errorSubmit.size = "file lớn hơn 1mb";
            }
            let names = file.name;
            let abc = names.split(".");
            let lists = ["png", "jpg", "jpeg", "PNG", "JPG"];
            let image = lists.includes(abc[1]);

            if (!image) {
                flag = false;
                errorSubmit.name = "file không phải file ảnh";
            }
        }

        if (inputs.country === undefined) {
            flag = false;
            errorSubmit.name = "vui lòng chọn country";
        }
        
        if(!flag){
            setErrors(errorSubmit);
        }
        else{
            const data = {
                name : inputs.name,
                email : inputs.email,
                password : inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatar,
                country: inputs.country,
                level: 0,
            }
            console.log(data);
            axios
            .post("http://localhost/laravel/public/api/register", data)
            .then((res)=>{
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    console.log(res);
                    alert("dang ky thanh cong");
                }
            })
        }

        

    }

    return (
        <div className="signup-form">
            {/*sign up form*/}
            <h2>New User Signup!</h2>
            <form id="signup" action="#" onSubmit={handleSubmit}>
                <input
                    className="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={hanldeInput}
                />
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
                <input
                    className="phone"
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    onChange={hanldeInput}
                />
                <input
                    className="address"
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={hanldeInput}
                />
                <input
                    className="avatar"
                    type="file"
                    placeholder="Avatar"
                    name="avatar"
                    onChange={hanldeFile}
                />
                <select
                    className="form-control form-control-line"
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
                    Signup
                </button>
            </form>
        </div>
    );

}
export default Register;