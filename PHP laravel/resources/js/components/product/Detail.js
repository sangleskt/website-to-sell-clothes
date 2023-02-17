import React, { Component } from 'react'
import axios from 'axios'
import SlideImage from './SlideImage'
import InforMation from './InforMation'
import { Link } from 'react-router-dom'
import App from '../App'


class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:'',
      imageJson:''
    }
  }

  componentDidMount () {
    let url = window.Laravel.baseUrl + '/api/product/detail/' + this.props.match.params.id
    axios.get(url)
      .then(response => {
        this.setState({
          data: response.data.data,
          imageJson: JSON.parse(response.data.data.image)
        })
        
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  render () {
    return (
      <App>	
	      	<div className="col-sm-9 padding-right">
            <div className="product-details">
              <SlideImage data={this.state.data} imageJson={this.state.imageJson} />
              <InforMation data={this.state.data} />
            </div>
          </div>
      </App>
    )
  }
}

export default Detail