import React from 'react';
import {Container, ModalBody} from './styled.js';

export default ({children, status, setModalStatus})=>{

    const clickHandle = (e) => {
        if(e.target.classList.contains('modalBg')){
            setModalStatus(false);
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