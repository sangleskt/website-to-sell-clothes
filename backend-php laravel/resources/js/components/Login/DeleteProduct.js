// resources/assets/js/components/UserList.js
import React, { Component } from 'react'
import axios from 'axios'

class DeleteProduct extends Component {
  constructor (props) {
    super(props)
    this.DeleteProduct=this.DeleteProduct.bind(this)
  }
  
  DeleteProduct(){
    let url = window.Laravel.baseUrl + '/api/user/delete-product/' + this.props.id;
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ this.props.accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    };
    axios.get(url, config)
        .then(response => {           
            this.props.removeProduct(response.data.data) 
    })
  }

  render () {
    return (
        <span onClick={this.DeleteProduct}>Delete</span>  
        )
    }
  }
export default DeleteProduct