import React from 'react';
import {Container, ModalBody} from './styled.js';

export default ({children, status, setStatus})=>{

    const clickHandle = (e) => {
        if(e.target.classList.contains('modalBg')){
           setStatus(false);
        }
    }

    return (
        <Container className="modalBg" status={status} onClick={clickHandle}>
            <ModalBody>
                {children}
            </ModalBody>    
        </Container>
        )

}