import React from 'react';
import {Wrapper} from './styled.js';

export default ({children, title, id, className,submitHandle})=>{

    return (
        <Wrapper>
            {title &&
                <div className="title"><span>{title}</span></div>
            }
            
            <form method="post" onSubmit={(e)=>submitHandle(e)} id={id} className={className}>
                {children}
            </form>
        </Wrapper>  
        )

}