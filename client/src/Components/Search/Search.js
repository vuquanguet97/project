import React from 'react';
import './Search.css';

function Search(props){
    return(
        <div className="divSearch">
            {<img className={props.position} src={props.imgName} alt=""/>}
            <input 
                className={props.className}
                type="text" 
                name={props.name}
                value={props.value} 
                placeholder={props.placeholder}
                onChange={props.onChange} 
                autoComplete="off"
                onKeyPress={props.onKeyPress}
            /><br/>
        </div>       
    );
}
export default Search;