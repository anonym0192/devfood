import React from 'react';
import {Container, PaginationItem} from './styled.js';

export default ({totalPages, activePage, setActivePage}) =>{


    return (
        <Container>
            {Array(totalPages).fill(0).map((item, index)=>(
                <PaginationItem 
                    key={index} 
                    current={index+1} 
                    active={activePage}
                    onClick={()=>setActivePage(index+1)}>
                        {index+1}
                </PaginationItem>
            ))}
        </Container>
    )

}