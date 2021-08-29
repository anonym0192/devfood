import styled from 'styled-components';

export const  Container = styled.div`


`;

export const ForgetPasswordLink = styled.div`


margin: -8px 0 20px 0;
  
  a{
    color: #16a085;
    font-size: 17px;
    text-decoration: none;
  }

  .a:hover{
    text-decoration: underline;
  }

`;

export const SignupLink = styled.div`


text-align: center;
margin-top: 20px;
font-size: 17px;
  
 a{
    color: #16a085;
    text-decoration: none;
  }
 a:hover{
    text-decoration: underline;
 }

`;


export const Prepend = styled.div`
height: ${props => props.height ? props.height : '45px'};
padding: 0 15px;
background: #16a085;
border: 1px solid #16a085;
border-radius: 5px 0 0 5px;
display: flex;
align-items: center;
justify-content: center;
  
  svg{  
    //width: 47px !important;
    height: 100%;
    color: #fff;
    font-size: 18px;
  }
`;
