// resources/assets/js/components/UserList.js

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import App from '../App'


class Home extends Component {
  constructor (props) {
    super(props)
    // this.state = {
	// 	token: JSON.parse(localStorage["appState"]).user.auth_token,
	// 	users: []
	// };
	this.state = {
		dataProduct:''
	}
	this.fetchImage = this.fetchImage.bind(this)
  }

//   demo get api accessToken
//   componentDidMount () {
//     let accessToken = localStorage.getItem('token');
//     let url = window.Laravel.baseUrl + '/api/details';  
//     let config = { 
//         headers: { 
//           'Authorization': 'Bearer '+ accessToken,
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Accept': 'application/json'
//         } 
//     };
//     axios.get(url, config)
//       .then(response => {
//         console.log(response)
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//   }
// 
	componentDidMount () {
		
		let url = window.Laravel.baseUrl + '/api/product';  
		axios.get(url)
		.then(response => {
			this.setState({
				dataProduct: response.data.data
			})
		})
		.catch(function (error) {
			console.log(error) 
		})
	}

	fetchImage () {
		if (this.state.dataProduct instanceof Array) {
			return this.state.dataProduct.map( (object, i) => {
			  let image = JSON.parse(object.image)
			  return (
						<div key={i} index={i} className="col-sm-4">
							<div className="product-image-wrapper">
								<div className="single-products">
										<div className="productinfo text-center">
											<img src={'/upload/product/' + object.id_user + '/' + image[0]} alt="" />
											<h2>${object.price}</h2>
											<p>{object.name}</p>
											<Link to={'/product/detail' + object.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>More detail</Link>
										</div>
										<div className="product-overlay">
											<div className="overlay-content">
												<h2>$56</h2>
												<p>Easy Polo Black Edition</p>
												<Link to={'/blog/detail/'} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
											</div>
										</div>
								</div>
								<div className="choose">
									<ul className="nav nav-pills nav-justified">
										<li><Link to={'/blog/detail/'}><i className="fa fa-plus-square"></i>Add to wishlist</Link></li>
										<li><Link to={'/product/detail/' + object.id}><i className="fa fa-plus-square"></i>More detail</Link></li>
									</ul>
								</div>
							</div>
						</div> 
				  )
			})
		}
  	}

	render () {
		return (
		<App>	
				<div className="col-sm-9 padding-right">
						<div className="features_items">
							<h2 className="title text-center">Features Items</h2>
							{this.fetchImage()}
						</div>
						
						<div className="category-tab">
							<div className="col-sm-12">
								<ul className="nav nav-tabs">
									<li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
									<li><a href="#blazers" data-toggle="tab">Blazers</a></li>
									<li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
									<li><a href="#kids" data-toggle="tab">Kids</a></li>
									<li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
								</ul>
							</div>
							<div className="tab-content">
								<div className="tab-pane fade active in" id="tshirt" >
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								
								<div className="tab-pane fade" id="blazers" >
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								
								<div className="tab-pane fade" id="sunglass" >
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								
								<div className="tab-pane fade" id="kids" >
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								
								<div className="tab-pane fade" id="poloshirt" >
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery2.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery4.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery3.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="product-image-wrapper">
											<div className="single-products">
												<div className="productinfo text-center">
													<img src="images/home/gallery1.jpg" alt="" />
													<h2>$56</h2>
													<p>Easy Polo Black Edition</p>
													<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="recommended_items">
							<h2 className="title text-center">recommended items</h2>
							
							<div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
								<div className="carousel-inner">
									<div className="item active">	
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend1.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend2.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend3.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
									</div>
									<div className="item">	
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend1.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend2.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="product-image-wrapper">
												<div className="single-products">
													<div className="productinfo text-center">
														<img src="images/home/recommend3.jpg" alt="" />
														<h2>$56</h2>
														<p>Easy Polo Black Edition</p>
														<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
													</div>
													
												</div>
											</div>
										</div>
									</div>
								</div>
								<a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
									<i className="fa fa-angle-left"></i>
								</a>
								<a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
									<i className="fa fa-angle-right"></i>
								</a>			
							</div>
						</div>
						
					</div>
		</App>
		)
	}
}

export default Home