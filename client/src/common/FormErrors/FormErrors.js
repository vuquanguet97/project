import React from 'react';
import './FormErrors.css';

function FormErrors(props){
  return(
  <div className='formErrors'>
    {props.type}
  </div>
  );
}
export default FormErrors;