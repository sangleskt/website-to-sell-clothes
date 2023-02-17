import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux"


class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment : '',
      errorLogin:'',
      userData: JSON.parse(localStorage["appState"]),
		  users: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
  }

  handleChangeMessage(e){
    this.setState({
      comment: e.target.value
    })
  }


  handleSubmit (e) {
    e.preventDefault()
    
    
    if (!this.state.userData.isLoggedIn){
        console.log("login1")
        this.setState({
          errorLogin: 'Please login to comment!'
        })
        
    } else{
        let url = window.Laravel.baseUrl + '/api/blog/comment/' + this.props.idBlog
        const data = {
          id_blog: this.props.idBlog,
          id_user: this.state.userData.user.auth.id,
          id_comment: this.props.idSubComment ? this.props.idSubComment : 0,
          comment: this.state.comment,
          image_user: this.state.userData.user.auth.avatar,
          name_user: this.state.userData.user.auth.name
        }
        
        axios.post(url, data)
        .then(response => {
         
          if(response.data.data) {
            // get comment push to array listComment
            this.props.addComment(response.data.data) 
          } else {
            this.setState({
               error: response.data
            })
          }  
        })
        .catch(function (error) {
            console.log(error)
        })
     
    }
  }

  checkValidateComment(){
    if (this.state.error) {
       return (
          <p>{this.state.error.message ? this.state.error.message : ''}</p>
      )
    }
  }

  // infomartionUser() {
  //   if(localStorage.getItem('auth')) {
  //     let infoUserStorage = JSON.parse(localStorage.getItem('auth'));
  //     return <input type="hidden" value={infoUserStorage.email} />
  //   }
  // }

  render () {
    return (
	      	<div  className="replay-box" >
            <div className="row">
              <p>{this.state.errorLogin ? this.state.errorLogin : ''}</p>
              {this.checkValidateComment()}
              <div className="col-sm-4">
                <h2>Leave a replay</h2>
                
                <form>
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <input type="text" placeholder="write your name..." />
                  <div className="blank-arrow">
                    <label>Email Address</label>
                  </div>
                  <span>*</span>
                  <input type="email" placeholder="your email address..." />
                  <div className="blank-arrow">
                    <label>Web Site</label>
                  </div>
                  <input type="email" placeholder="current city..." /> 
                </form>
              </div>
              <div className="col-sm-8">
                <div id="repComment" className="text-area">
                  <form onSubmit={this.handleSubmit}>
                 
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea  name="comment" rows="11"  onChange={this.handleChangeMessage} defaultValue={this.state.comment} />
                    
                    <input type="submit" className="btn btn-primary" value="post comment" />
                  </form>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    infoUser: state.getUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getUser: (infoUser) => dispatch(getUser(infoUser))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Comment));
