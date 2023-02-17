import React, { Component } from 'react'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import './react-popupbox.css'

class SlideImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgShow: ''
    }
    this.fetchImage = this.fetchImage.bind(this)
    this.zoomImg = this.zoomImg.bind(this)
    this.changeImg = this.changeImg.bind(this)
   
  }

  fetchImage () {
    if (this.props.imageJson instanceof Array) {
			return this.props.imageJson.map((item, i) => {
        return (
          <div className={i == 1 ? 'item active' : 'item'} key={i} index={i}>
            {
              this.props.imageJson.map((item2, j) => {
                return ( 
                    <img id={item2} onClick={this.changeImg} key={j} src={'/upload/product/' + this.props.data.id_user + '/small_' + item2} alt="" /> 
                )
              })
            }
          </div>
        )
      })
    }
  }

  changeImg(e) {
    this.setState({
      imgShow: e.target.id 
    })
  }

  zoomImg() {
    const content = <img src={'/upload/product/' + this.props.data.id_user + '/' + this.state.imgShow} alt="" /> 
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: 'Meow!'
        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
      imgShow: nextProps.imageJson[0]
    })
  }

  render () {
    return (
            <div className="col-sm-5">
                <div className="view-product">
                    <img src={'/upload/product/' + this.props.data.id_user + '/larger_' + this.state.imgShow} alt="" /> 
                    
                    <span onClick={this.zoomImg}><h3>ZOOM</h3></span>
                    <PopupboxContainer />
                  
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {this.fetchImage()}
                    </div>
                    
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                    <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                    <i className="fa fa-angle-right"></i>
                    </a>
                </div>

            </div>
    )
  }
}

export default SlideImage