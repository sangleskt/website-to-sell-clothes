// resources/assets/js/components/UserList.js

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import App from '../App'
import { connect } from "react-redux";
import { getUser } from "../../actions"
import Register from './Register'
import FormErrors from './FormErrors'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      email: '',
      data: '',
      error:'',
      auth:'',
      emailValid: false,
      passwordValid: false,
      formErrors: {email: '', password: ''},
      isLoggedIn: false,
      user: {}
    }
    
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // localStorage.removeItem('jwt');
    // localStorage.removeItem('auth');
    // let appState = {
    //   isLoggedIn: false,
    //   user: {}
    // };
    // // save app state with user date in local storage
    // localStorage["appState"] = JSON.stringify(appState);
    // this.setState(appState);
  }
  
  handleUserInput (e){
    const nameInput = e.target.name;
    const value = e.target.value;
    this.setState({[nameInput]: value}, 
                       () => { this.validateField(nameInput, value) });
  }

  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/login'
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post(url, data)
      .then(response => {
        // 
        if (response.data.success) {
          let userData = {
            name: response.data.Auth.name,
            id: response.data.Auth.id,
            email: response.data.Auth.email,
            avatar: response.data.Auth.avatar,
            auth_token: response.data.success.token,
            auth: response.data.Auth
            // timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });

          this.props.history.push('/')
        } else {
          this.setState({
            formErrors: response.data.errors
          })
        }
        // 
        // if(response.data.errors) {
        //   this.setState({
        //       formErrors: response.data.errors
        //   })
        // } else {
        //    localStorage.setItem('token', response.data.success.token);
        //    localStorage.setItem('auth', JSON.stringify(response.data.Auth));  
        // }
      })
      .catch(function (error) {
          console.log(error)
      })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;
    
    switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid Email';
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        default:
    break;
    }
   
  this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: 
        this.state.emailValid 
        && this.state.passwordValid
    });
  }
  
  render () {
    return (
      <App>	
         <div className="col-sm-9">
	      	<div className="col-sm-12">
            <div className="login-form">
              <h2>Login to your account</h2>
              <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
              </div>
              <form onSubmit={this.handleSubmit}>
                <input name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleUserInput} />
                <input name="password" type="password" value={this.state.password} onChange={this.handleUserInput}/>
                <span>
                  <input name="remember_me" type="checkbox" className="checkbox" value={this.state.password} onChange={this.handleUserInput}/> 
                  Keep me signed in
                </span>

                <button type="submit" className="btn btn-default" disabled={!this.state.formValid}>Login</button>
              </form>
            </div>
          </div>
          <div className="col-sm-12">
            <h2 className="or">OR</h2>
          </div>
          <Register  />
        </div>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return {
    sumResult: state.getUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (infoUser) => dispatch(getUser(infoUser))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
