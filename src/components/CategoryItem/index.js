import  React from 'react';
import {Container, ItemImage} from './styled';
import {useHistory} from 'react-router-dom';

export default ({data, activeCategory, setActive}) =>{
    
    //const history = useHistory()
    const active = activeCategory === data.id;
    
    const clickHandle = ()=>{
        setActive(data.id);
        console.log(activeCategory);
    }

    return ( 
        <Container data-tip={data.name} data-for="tip-top" isActive={active} onClick={clickHandle}>
            <ItemImage src={data.image} alt={data.name}/>
        </Container>
    );
}
