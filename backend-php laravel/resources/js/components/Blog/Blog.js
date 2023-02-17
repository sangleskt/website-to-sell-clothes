import React, { Component } from 'react'
import App from '../App'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Pagination from "react-js-pagination"

class Blog extends Component {
  constructor (props) {
    super(props)
    this.state = {
    	listBlog: '',
        value: '',
        items: '',
        activePage: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        pageRangeDisplayed: 3,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount () {
    axios.get(window.Laravel.baseUrl + '/api/blog?page=' + this.state.activePage)
      .then(response => {
        this.setState({
         items: response.data.blog,
         activePage: response.data.blog.current_page,
         itemsCountPerPage: response.data.blog.per_page,
         totalItemsCount: response.data.blog.total,

     })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handlePageChange(pageNumber) {
    axios.get(window.Laravel.baseUrl + '/api/blog?page=' + pageNumber)
        .then(response => {
            this.setState({
                items: response.data.blog,
                activePage: response.data.blog.current_page,
            });
        })
}

  fetchData () {
  	
    if (this.state.items.data instanceof Array) {
      return this.state.items.data.map( (object, i) => {
        return (
    	 		<div key={i} index={i} className="single-blog-post">
					<h3>{object.title}</h3>
					<div className="post-meta">
						<ul>
							<li><i className="fa fa-user"></i> Mac Doe</li>
							<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
							<li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
						</ul>
						<span>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
						</span>
					</div>
					<a href="">
						<img src={window.Laravel.baseUrl + '/upload/Blog/image/' + object.image} alt="" />
					</a>
					<p>{object.description}</p>
					<Link className="btn btn-primary" to={'/blog/detail/'+object.id}>Read More</Link>
					
				</div>
        	)
      })
    }
  }

  render () {
    return (
      <App>	
	      	<div className="col-sm-9">

    				<div className="blog-post-area">
    					<h2 className="title text-center">Latest From our Blog</h2>
    					{this.fetchData()}
    					<div className="pagination-area">
    						<Pagination
	                    activePage={this.state.activePage}
	                    itemsCountPerPage={this.state.itemsCountPerPage}
	                    totalItemsCount={this.state.totalItemsCount}
	                    pageRangeDisplayed={3}
	                    onChange={this.handlePageChange}
	                />
                </div>
    				</div>
    			</div>
      </App>
    )
  }
}

export default Blog