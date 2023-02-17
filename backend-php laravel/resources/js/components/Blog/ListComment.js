// resources/assets/js/components/UserList.js
import React, { Component } from 'react'

const scrollToRef = () => window.scrollTo(0, test.offsetTop)

class ListComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
        data : ''
    }
    this.clickIdSubComment=this.clickIdSubComment.bind(this)
  }

  componentDidMount () {
    
  }
  
  clickIdSubComment(e){
    this.props.getIdSubComment(e.target.id) 

  }
  

  loadListComment(){
        
        if (this.props.listComment instanceof Array) {
            return this.props.listComment.map((object, i) => {
                if(object.id_comment == 0) {
                    return (
                        <div>
                            <li key={i} index={i} className="media">
                            
                                <a className="pull-left" href="#">
                                    <img src={window.Laravel.baseUrl + '/upload/user/avatar/' + object.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>{object.comment}</p>
                                    <a href="#repComment" id={object.id} onClick={this.clickIdSubComment} className="btn btn-primary"><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                    
                            {this.props.listComment.map((object2, j) => {
                                if(object.id == object2.id_comment) {
                                    return (
                                        <li key={j} index={j} className="media second-media">
                                            <a className="pull-left" href="#">
                                                <img src={window.Laravel.baseUrl + '/upload/user/avatar/' + object2.image_user} alt="" />
                                            </a>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                                </ul>
                                                <p>{object2.comment}</p>
                                            </div>
                                        </li>
                                    );
                                }
                            })}
                        </div>
                    )
                }
            })
            
        }
  }

  render () {
    return (
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                {this.loadListComment()}
                <li className="media second-media">
                    <a className="pull-left" href="#">
                        <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                    </a>
                    <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user"></i>Janis Gallagher</li>
                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                    </div>
                </li>
            </ul>
        </div>    
        )
    }
  }
export default ListComment