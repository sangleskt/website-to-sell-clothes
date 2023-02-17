import React, { Component } from 'react'

const pStyle = {
    color: 'red'
  };
class FormErrors extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let formErrors = this.props.formErrors
    return (
        <div className='formErrors'>
            {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                <p style={pStyle} key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
            } else {
                return '';
            }
            })}
        </div>
 
    )
  }
}
export default FormErrors
