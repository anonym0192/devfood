import React from 'react';
import {FormButton} from './styled.js';
import Loading from '../Loading';

export default ({text, type, loading, className, style})=>{

    
    return (
    <FormButton type={type} disabled={loading ? 'disabled' : '' } className={className} style={style}>
        
        { !loading && text } 
        
        { loading && <Loading /> }

    </FormButton>  
        )

}