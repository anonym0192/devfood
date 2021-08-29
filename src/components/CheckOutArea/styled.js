import styled from 'styled-components';

export const Container = styled.div`

form{
    min-width: 700px;
}

label{
   width: 135px;
}

select, input{
    width: 100%;
    height: 40px;
    outline: none;
    padding: 0px 5px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    font-size: 16px;
    transition: all 0.3s ease;
    margin: 0 20px;
    
    :focus{
        border-color: #16a085;
        box-shadow: inset 0px 0px 2px 2px rgba(26,188,156,0.25);
    }
}

@media (max-width: 700px){
    
    select, input{
        margin: 0;
    }
            
    form{
        min-width: 100vw;
    }
    
}

`;

