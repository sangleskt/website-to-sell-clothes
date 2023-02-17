import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './style.css'
import FormErrorsProduct from './FormErrorsProduct'

const liStyle = {
    display: 'inline-block',
    margin: '0 10px'
};
const imgStyle = {
    width: '50px',
    height: '50px'
};

class AddProduct extends Component {
  constructor (props) {
    super(props)
    this.state = {
        listCategory:'',
        listBrand:'',
        category: '',
        brand: '',
        name: '',
        price: '',
        company:'',
        avatar:'',
        avatarList:[],
        detail:'',
        formErrors: '',
        userData: JSON.parse(localStorage["appState"]),
        // edit
        avatarCheckBox:[],
        avatarOld:'',
        avatarListDelete:''
        //if (!this.state.userData.isLoggedIn){
    }
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleUserInputFile = this.handleUserInputFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    componentDidMount () {
        
        let urlCB = window.Laravel.baseUrl + '/api/category-brand';  
        axios.get(urlCB)
            .then(response => {
                this.setState({
                    listCategory: response.data.category,
                    listBrand: response.data.brand
                });
            })   
        
        // edit product 
        let parseIntId = Number(this.props.match.params.id)
        if(parseIntId) {
            let accessToken = this.state.userData.user.auth_token;
            let url = window.Laravel.baseUrl + '/api/user/product/' + this.props.match.params.id;    
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            axios.get(url, config)
                .then(response => {
                    let data = response.data.data;
                    
                    this.setState({
                        name: data.name,
                        price: data.price,
                        detail: data.detail,
                        company: data.company_profile,
                        category: data.id_category,
                        brand: data.id_brand,
                        avatarOld: data.image,
                        avatarListDelete:data.image
                    })
                    
                })      
        }
        // 
         
    }  
    
    handleSubmit (e) {
        e.preventDefault()

        let flag = true
        let category = this.state.category;
        let brand = this.state.brand;
        let name = this.state.name;
        let price = this.state.price;
        let company = this.state.company;
        let detail = this.state.detail;
        let avatar = this.state.avatar;
        let errorSubmit = [];
        
        if(!category) {
            flag = false;
            errorSubmit.push("category");
        }
        if(!brand) {
            flag = false;
            errorSubmit.push("brand");
        }
        if(!name) {
            flag = false;
            errorSubmit.push("name");
        }
        if(!price) {
            flag = false;
            errorSubmit.push("price");
        }
        if(!company) {
            flag = false;
            errorSubmit.push("company");
        }
        if(!detail) {
            flag = false;
            errorSubmit.push("detail");
        }
        
        // edit
        if((avatar.length) > 5) {
            flag = false;
            errorSubmit.push("avatar");
        }
        if(!flag) {
            this.setState({
                formErrors: errorSubmit
            });
        }  
      
        if(flag) {
            //console.log(flag)
            // convert object to array
            // const result = Object.keys(data).map(function(key) {
            //     return [Number(key), data[key]];
            // });
            
           
            let accessToken = this.state.userData.user.auth_token;
             
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
                } 
            };
            let formData = new FormData();
            formData.append('category', this.state.category);
            formData.append('brand', this.state.brand);
            formData.append('name', this.state.name);
            formData.append('price', this.state.price);
            formData.append('company', this.state.company);
            formData.append('detail', this.state.detail);
            Object.keys(avatar).map((item, i) => {
                formData.append("file[]", avatar[item]);
            });
            
            let parseIntId = Number(this.props.match.params.id)
            if(!parseIntId) {
                let url = window.Laravel.baseUrl + '/api/user/add-product'; 
                axios.post(url, formData, config)
                .then(response => {
                    if(response.data.response === 'success') {
                        this.props.history.push('/user/my-product')
                    }
                })
                .catch(errors => {
                        //console.log(errors)
                })
            } else {
                let url = window.Laravel.baseUrl + '/api/user/edit-product/' + this.props.match.params.id; 
                //formData.append('avatarCheckBox[]', this.state.avatarCheckBox);
                Object.keys(this.state.avatarCheckBox).map((item, i) => {
                    formData.append("avatarCheckBox[]", this.state.avatarCheckBox[item]);
                });
                axios.post(url, formData, config)
                .then(response => {
                    if(response.data.response === 'success') {
                        this.props.history.push('/user/my-product')
                    }
                })
                .catch(errors => {
                        //console.log(errors)
                })
            }
        }
        // 
        
    }

    // removeInArrayAvatar (array1, array2) {
    //     // remove in Array
    //     // array2.map((item) => {
    //     //     let index = array1.indexOf(item);
    //     //     if (index > -1) {
    //     //         array1.splice(index, 1);
    //     //     }
    //     // })
       
    //     // return value not remove
    //     // let arrNotDelete = [];
    //     // // let array1 = [1, 2, 3, 4, 5];
    //     // // let array2 = [1, 2];
    //     // array1.map((item) => {
    //     //     let index = array2.includes(item)
    //     //     if (!index) {
    //     //         arrNotDelete.push(item);
    //     //     }
    //     // })
    //     // return arrNotDelete;
    // }

    handleUserInputFile (e){
       
        const fileFront = e.target.files;
        this.setState({
            avatar: fileFront
        })
        //send file to api server
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     console.log(e.target.result)
        //     this.setState({
        //         avatar: e.target.result
                
        //     })
        // };
        // reader.readAsDataURL(fileFront[0]);
        
      }

    handleUserInput (e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        const isChecked = e.target.checked;

        // input type checkbox
        if(nameInput === 'avatarCheck') {
            let avatarCheckBox = this.state.avatarCheckBox;
            if(isChecked) {
                avatarCheckBox.push(value)
                this.setState({
                    avatarCheckBox: avatarCheckBox
                })
            } else {
                let index = avatarCheckBox.indexOf(value);
                if (index > -1) {
                    avatarCheckBox.splice(index, 1);
                }
            }
        // input type text and textare    
        } else {
            this.setState({
                [nameInput]: value
            })
        }
       


    }
    
    renderCategory() {
        if(this.state.listCategory instanceof Array) {
            return this.state.listCategory.map((item, i) => {
                return (
                    <option key={i} index={i} value={item.id}>
                        {item.category}
                    </option>
                )
            })
        }   
    }

    renderBrand() {
        if(this.state.listBrand instanceof Array) {
            return this.state.listBrand.map((item, i) => {
                return (
                    <option key={i} index={i} value={item.id}>
                        {item.brand}
                    </option>
                )
            })
        }
    }

    renderImage() {
        
        if(this.state.avatarOld instanceof Array) {
            return this.state.avatarOld.map((item, i) => {
                return (
                    <li style={liStyle} key={i}>
                        <img style={imgStyle} src={'/upload/product/' + this.state.userData.user.id + '/' + item} />
                        <input name="avatarCheck" type="checkbox" value={item} onChange={this.handleUserInput} />
                    </li>
                )
            }) 
        }
     
        // let imagePreview = null;
        // if (imagePreviewUrl) {
        // imagePreview = <img src={'/upload/user/avatar/' + imagePreviewUrl} />;
        // } else {
        // imagePreview = <div className="previewText">Please select an Image for Preview</div>;
        // }
    }

    render () {
        return (
            <App>	
                <div className="col-sm-9">
                    <div className="col-sm-12">
                        <div className="signup-form">
                            <h2>Create product!</h2>
                            <FormErrorsProduct formErrors={this.state.formErrors} />

                            <form onSubmit={this.handleSubmit}>
                                <select value={this.state.category} name="category" onChange={this.handleUserInput}>
                                    <option value="">Please choose category</option>
                                    {this.renderCategory()}
                                </select>
                                <select value={this.state.brand} name="brand" onChange={this.handleUserInput}>
                                    <option value="">Please choose brand</option>
                                    {this.renderBrand()}
                                </select>
                                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleUserInput}/>
                                <input type="text" placeholder="Price"  name="price" value={this.state.price} onChange={this.handleUserInput}/>
                                <input type="text" placeholder="Company profile"  name="company" value={this.state.company} onChange={this.handleUserInput}/>
                                <input type="file" name="avatar[]" onChange={this.handleUserInputFile} multiple/>
                                <div className="imgPreview">
                                    <ul>
                                        {this.renderImage()}
                                    </ul>
                                </div>
                                <textarea name="detail" placeholder="Detail" onChange={this.handleUserInput}></textarea>
                                
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </App>        
    
        )
    }
}
export default AddProduct
