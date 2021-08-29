import styled from 'styled-components';

export const FormGroup = styled.div`

width: ${props => props.rowWidth ? props.rowWidth+'%' : '100%'};
height: auto;
margin-bottom: 15px;
position: relative;
display: flex; 
align-items: center;


@media (max-width: 700px){
    width: 100%;
    //flex-direction: column;
    //align-items: flex-start;
    //justify-content: center;
}

`;




