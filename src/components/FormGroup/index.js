import React from 'react';
import {FormGroup} from './styled.js';

export default ({children, rowWidth})=>{

    return (
        <FormGroup rowWidth={rowWidth}>
            {children}
        </FormGroup>  
        )

}