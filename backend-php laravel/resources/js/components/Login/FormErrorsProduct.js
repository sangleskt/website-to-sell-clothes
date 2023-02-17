import React, { Component } from 'react'

const pStyle = {
    color: 'red'
  };
class FormErrorsProduct extends Component {
  constructor (props) {
    super(props)
  }

  renderError() {
    if(this.props.formErrors instanceof Array) {
        return this.props.formErrors.map((item, i) => {
            return (
                <p style={pStyle} key={i}>{item}</p>
            )
        })
    }
  }

  render () {
    //let formErrors = this.props.formErrors
    return (
        <div className='formErrors'>
            {this.renderError()}
        </div>
 
    )
  }
}
export default FormErrorsProduct
