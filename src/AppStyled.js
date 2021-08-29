import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex: 1;
height: 100vh;
`;

export const Menu = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80px;
height: 100vh;
background-color: #006505;
`;

export const BodyPage = styled.div`
display: block;
height: 100vh;
background-color: #00990d;
background-image: url('assets/images/bg.png');
overflow-y: scroll;
width: 100%;
height: 100vh;
padding: 15px 12px;
`;


export const Message = styled.div`
position: relative;
padding: .75rem 1.25rem;
margin-bottom: 1rem;
border: 1px solid transparent;
border-radius: .25rem;

`; 

export const ErrorMessage = styled(Message)`

color: #721c24;
background-color: #f8d7da;
border-color: #f5c6cb;

`;

export const SuccessMessage = styled(Message)`
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
`;

export const DefaultButton = styled.button`
    background-color: #073c06;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 2px 3px 0 #00000038;
    margin-left: 15px;
    height: ${props => props.height ? props.height : 'auto'}
  
`;