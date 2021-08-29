import React from 'react';
import {FormInput} from './styled.js';

export default ({placeholder, name, type, value, width, height, style, setValue, required})=>{


    return (
        <FormInput onChange={e => setValue(e)} 
            type={type ? type : 'text'} 
            name={name}
            width={width}
            height={height} 
            placeholder={placeholder} 
            value={value} 
            style={style} 
            required={required} />  
        )

}