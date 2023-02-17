import React, { Component } from 'react'
import App from '../App'
import { Link } from 'react-router-dom'
import Register from './Register'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
        userData: JSON.parse(localStorage["appState"]),
		users: []
    }
  }

  componentDidMount () {
    if (!this.state.userData.isLoggedIn){
        this.props.history.push('/login')
    }  
  }  

    render () {
        return (
            <App>	

                <div className="col-sm-9">
                    <div className="col-sm-12">
                        <p><Link to='/user/my-product'>My product</Link></p>
                    </div>
                    <Register infoUser={this.state.userData.user.auth} />
                </div>
            </App>        
    
        )
    }
}
export default Account
