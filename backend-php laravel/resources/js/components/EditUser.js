// resources/assets/js/components/EditUser.js

import React, { Component } from 'react'
import App from './App'
import axios from 'axios'

class EditUser extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      availability: '',
      error:''
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.handleChangeAvailability = this.handleChangeAvailability.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    let url = window.Laravel.baseUrl + '/api/testapi/' + this.props.match.params.id
    axios.get(url)
      .then(response => {
        this.setState(response.data.product)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleChangeTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  handleChangeDescription (e) {
    this.setState({
      description: e.target.value
    })
  }

  handleChangePrice (e) {
    this.setState({
      price: e.target.value
    })
  }

  handleChangeAvailability (e) {
    this.setState({
      availability: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    let url = window.Laravel.baseUrl + '/api/testapi/' + this.props.match.params.id
    const data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      availability: this.state.availability
    }
    axios.put(url, data)
      .then(response => {
         if(response.data.errors != null) {
           this.setState({
              error: response.data.errors
           })
         } else {
           this.props.history.push('/testapi')
         }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

   showError () {
    if (this.state.error) {
       return (
          <div>
            <p>{this.state.error.title ? this.state.error.title : ''}</p>
            <p>{this.state.error.description ? this.state.error.description : ''}</p>
            <p>{this.state.error.price ? this.state.error.price : ''}</p>
            <p>{this.state.error.availability ? this.state.error.availability : ''}</p>
          </div>
      )
    }
  }

  render () {
    return (
      <App>
        <h1>Edit User</h1>
        {this.showError()}
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Title</label>
            <input type='text' className='form-control' id='title' placeholder='title'
              value={this.state.title} onChange={this.handleChangeTitle}  />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Description</label>
            <input type='text' className='form-control' id='description' placeholder='Description'
              value={this.state.description} onChange={this.handleChangeDescription}  />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Price</label>
            <input type='text' className='form-control' id='price' placeholder='Price'
              value={this.state.price} onChange={this.handleChangePrice}  />
          </div>

          <div className='form-group'>
            <label htmlFor='availability'>Availability</label>
            <input type='text' className='form-control' id='availability' placeholder='Availability'
              value={this.state.availability} onChange={this.handleChangeAvailability}  />
          </div>

          <button type='submit' className='btn btn-primary'>Add User</button>
        </form>
      </App>
    )
  }
}
export default EditUser