import styled from 'styled-components';

export const FormInput = styled.input`

 
height:  ${props => props.height ? props.height : '45px'};
width: 100%;
outline: none;
padding: 0px 5px;
border-radius: 5px;
border: 1px solid lightgrey;
font-size: 16px;
transition: all 0.3s ease;
  
:focus{
    border-color: #16a085;
    box-shadow: inset 0px 0px 2px 2px rgba(26,188,156,0.25);
  }

::placeholder{
    color: #999;
}
    
`;


