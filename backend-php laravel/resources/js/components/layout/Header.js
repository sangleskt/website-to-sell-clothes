import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter} from 'react-router-dom';

class Header extends Component {
  
  constructor(props) {
      super(props)
      this.logoutHandler = this.logoutHandler.bind(this)
      this.state = {
        userData: JSON.parse(localStorage["appState"]),
        users: []
      }
  }

  logoutHandler() {
      let appState = {
        isLoggedIn: false,
        user: {}
      };
      // save app state with user date in local storage
      localStorage["appState"] = JSON.stringify(appState);
      this.setState(appState);
      // 
      this.props.history.push('/login')
  }

  renderLoginLogout(){
    if (this.state.userData.isLoggedIn){
       return (
          <a onClick={this.logoutHandler}><i className="fa fa-lock"></i> Logout</a>
      )
    } else {
      return (
        <Link to='/login' ><i className="fa fa-lock"></i> Login</Link>
      )
    }
  }

  renderAccountLogout(){
    if (this.state.userData){
       return (
          <li><Link to='/user/account' ><i className="fa fa-user"></i> Account</Link></li>
      )
    } 
  }

  render () {
    return (
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                    <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="/"><img src="images/home/logo.png" alt="" /></a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="">Canada</a></li>
                      <li><a href="">UK</a></li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="">Canadian Dollar</a></li>
                      <li><a href="">Pound</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                     {this.renderAccountLogout()}
                    <li><a href=""><i className="fa fa-star"></i> Wishlist</a></li>
                    <li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
                    <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                    <li>
                      {this.renderLoginLogout()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to='/' className="active">Home</Link>
                    </li>
                    <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                        <ul role="menu" className="sub-menu">
                            <li><a href="shop.html">Products</a></li>
                            <li><a href="product-details.html">Product Details</a></li> 
                            <li><a href="checkout.html">Checkout</a></li> 
                            <li><a href="cart.html">Cart</a></li> 
                            <li><a href="login.html">Login</a></li> 
                        </ul>
                    </li> 
                    <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down"></i></a>
                        <ul role="menu" className="sub-menu">
                            <li>
                              <Link to='/blog/list'>Blog List</Link>
                            </li>
                            <li>
                              <Link to='/blog/single'>Blog Single</Link>
                            </li>
                        </ul>
                    </li> 
                    <li><a href="404.html">404</a></li>
                    <li><a href="contact-us.html">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default withRouter(Header);
