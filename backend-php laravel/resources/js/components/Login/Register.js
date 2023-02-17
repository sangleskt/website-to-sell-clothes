import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import FormErrors from './FormErrors'

const pStyle = {
    color: 'red'
};

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
        id:'',
        name: '',  
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        formValid: false,
        nameValid: false,
        emailValid: false,
        passwordValid: false,
        phoneValid:false,
        addressValid:false,
        checkAvatarType:false,
        checkAvatarSize:false,
        formErrors: {name: '', email: '', password: '', phone: '', address: '', avatar: ''},
        mgsSuccess: ''
    }
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleUserInputFile = this.handleUserInputFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

 // get prop when edit user   
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.infoUser){
        this.setState({
            id: nextProps.infoUser.id, 
            name: nextProps.infoUser.name,  
            email: nextProps.infoUser.email,
            phone: nextProps.infoUser.phone,
            address: nextProps.infoUser.address,
            avatar: nextProps.infoUser.avatar,
            formValid: true,
            nameValid: true,
            emailValid: true,
            passwordValid: true,
            phoneValid:true,
            addressValid:true,
            checkAvatarType:true,
            checkAvatarSize:true
        })
    }
  }

  componentDidMount() {
    //console.log(this.props.infoUser)
  }

  handleUserInput (e){
    const nameInput = e.target.name;
    const value = e.target.value;
    this.setState({[nameInput]: value}, 
                       () => { this.validateField(nameInput, value) });
  }

  handleUserInputFile (e){

    const nameInput = e.target.name;
    const fileFront = e.target.files;
    // send file to api server
    let reader = new FileReader();
    reader.onload = (e) => {
        this.setState({
            avatar: e.target.result
        })
    };
    reader.readAsDataURL(fileFront[0]);
    // 
    this.validateField(nameInput, fileFront[0]);
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = {
        id: this.state.id ? this.state.id : '',
        name: this.state.name,  
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        address: this.state.address,
        avatar: this.state.avatar,
        level: 0,
      }

    let url = window.Laravel.baseUrl + '/api/register';  
    
    // api update user
    if(this.state.id) {
        url = window.Laravel.baseUrl + '/api/user/update/' + this.state.id;
    }
    
    axios.post(url, data)
      .then(response => {
         if(response.data.errors) {
            this.setState({
                formErrors: response.data.errors
            })
         } else {
            this.setState({
                mgsSuccess: 'Register success! Please login to register your product.'
            })
         }
      })
      .catch(errors => {
            console.log(errors)
      })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let formValidCheck = true;
    let nameValid = this.state.nameValid;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let addressValid = this.state.addressValid;
    let checkAvatarType = this.state.checkAvatarType;
    let checkAvatarSize = this.state.checkAvatarSize;
    
    switch(fieldName) {
        case 'name':
            nameValid = value.length >= 6;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid Name';
            break;
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid Email';
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
        case 'phone':
            phoneValid = value.length >= 8;
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid Phone';
            break;
        case 'address':
            addressValid = value.length >= 8;
            fieldValidationErrors.address = addressValid ? '' : ' is invalid Phone';
            break;
        case 'avatar':
            let type = value.type.toLowerCase();
            let typeArr = type.split('/');
            let regex = ["png", "jpg", "jpeg"];
            checkAvatarType = regex.includes(typeArr[1]);
            checkAvatarSize = value.size < 208292;
            fieldValidationErrors.avatar = checkAvatarType ? (checkAvatarSize ? '' : 'is invalid size') : ' is invalid type image';
            break;
        default:
    break;
    }
   
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    phoneValid:phoneValid,
                    addressValid:addressValid,
                    checkAvatarType:checkAvatarType,
                    checkAvatarSize:checkAvatarSize
                }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: 
        this.state.nameValid 
        && this.state.emailValid 
        && this.state.passwordValid
        && this.state.phoneValid
        && this.state.addressValid
        && this.state.checkAvatarType
        && this.state.checkAvatarSize
    });
  }

  render () {

    let imagePreviewUrl = this.state.avatar;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img src={'/upload/user/avatar/' + imagePreviewUrl} />;
    } else {
      imagePreview = <div className="previewText">Please select an Image for Preview</div>;
    }

    return (
        <div className="col-sm-12">
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <div className="panel panel-default">
                    <p style={pStyle}>{this.state.mgsSuccess}</p>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleUserInput}/>
                <input type="text" placeholder="Email Address"  name="email" value={this.state.email} onChange={this.handleUserInput}/>
                <input type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleUserInput}/>
                <input type="text" placeholder="Phone"  name="phone" value={this.state.phone} onChange={this.handleUserInput}/>
                <input type="text" placeholder="Address"  name="address" value={this.state.address} onChange={this.handleUserInput}/>
                <input type="file" name="avatar" onChange={this.handleUserInputFile}/>
                <div className="imgPreview">
                    {imagePreview}
                </div>
                <button type="submit" className="btn btn-default" disabled={!this.state.formValid}>Signup</button>
                </form>
            </div>
        </div>
 
    )
  }
}


export default Register