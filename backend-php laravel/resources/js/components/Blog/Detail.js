// resources/assets/js/components/UserList.js

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import App from '../App'
import Comment from './Comment'
import ListComment from './ListComment'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
        data : '',
        comment: '',
        idSub: '',
        arrC: [],
        arrC2: []
    }
  }
  addComment(data){
    this.setState({comment: this.state.comment.concat(data)})
  }

  getIdSubComment(idSub){
    this.setState({idSub: idSub})
  }

   componentDidMount () {
    let url = window.Laravel.baseUrl + '/api/blog/' + this.props.match.params.id
    axios.get(url)
      .then(response => {
        this.setState(response.data.data)
        this.setState({comment: response.data.data.comment})
        // if(response.data.data.comment !== null) {
        //   const abc = response.data.data.comment;
          
        //   abc.map( (object, i) => {
        //     if(object.id_comment == 0) {
        //       this.state.arrC.push(object)
        //     }
        //   })

        //   abc.map( (object, i) => {
           
        //     this.state.arrC.map( (object2, j) => {
        //       if(object2.id == object.id_comment)
        //         console.log(object2.id)
        //     })
        //   })
        //   // console.log(this.state.arrC2)
        // }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <App>	
	      	<div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              <div className="single-blog-post">
                <h3>{this.state.title}</h3>
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
                  <img src={window.Laravel.baseUrl + '/upload/Blog/image/' + this.state.image} alt="" />
                </a>
                {this.state.description}
                {this.state.idSub}
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <ListComment getIdSubComment={this.getIdSubComment.bind(this)} listComment = {this.state.comment} />
            <Comment idSubComment = {this.state.idSub} addComment={this.addComment.bind(this)} idBlog = {this.props.match.params.id} />
          </div>


      </App>
    )
  }
}

export default Detail