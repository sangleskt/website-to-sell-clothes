import React from 'react';
function ErrorForm(props){

    function renderError(){
        let {errors} = props
        if(Object.keys(errors).length >0){
            return Object.keys(errors).map((value, key) =>{
                return(
                    <li style={{color: 'red'}}  key={key}>{errors[value]}</li>
                )
            })
        }
    }

    return(
        <ul>
            {renderError()}
        </ul>
    )
}
export default ErrorForm;