import React, { Component } from 'react'
import App from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteProduct from './DeleteProduct'
import './style.css';

const pStyle = {
    textAlign: 'right'
};

class MyProduct extends Component {
  constructor (props) {
    super(props)
    this.state = {
        listProduct:'',
        userData: JSON.parse(localStorage["appState"]),
		users: []
    }
  }

  componentDidMount () {
    if (!this.state.userData.isLoggedIn){
        this.props.history.push('/login')
    } else{
        let accessToken = this.state.userData.user.auth_token;
        let url = window.Laravel.baseUrl + '/api/user/my-product/';  
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        axios.get(url, config)
            .then(response => {
                this.setState({
                    listProduct: response.data.data
                });
            })
       
    }    
  }  

  removeProduct(data){
        this.setState({
            listProduct: data
        });
  }

  showListProduct(){
    if (this.state.listProduct instanceof Array) {
        return this.state.listProduct.map( (object, i) => {
          return (
                <tr key={i} index={i} className="single-blog-post">
                    <td>{object.id}</td>
                    <td>{object.name}</td>
                    <td>{object.price}</td>
                    <td>
                        <Link to={'/user/product/' + object.id} >Edit</Link> | 
                        <DeleteProduct accessToken = {this.state.userData.user.auth_token}  id={object.id} removeProduct={this.removeProduct.bind(this)} />
                    </td>
                </tr>
          )
        })
    }                  
  }
    render () {
        
        return (
            <App>	
                <div className="col-sm-9">
                    <div className="col-sm-12">
                        <p style={pStyle}><Link to='/user/product/add'>Add product</Link></p>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showListProduct()}
                        </tbody>
                    </table>
                </div>
            </App>        
    
        )
    }
}
export default MyProduct
