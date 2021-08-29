import styled from 'styled-components';

export const FormButton = styled.button`

  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: #006505;
  border: 1px solid #16a085;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  padding: 10px 40px;
  box-shadow: 2px 2px 4px #000000ab;

  &[disabled]{
    background-color: #00650587 !important;
    cursor: not-allowed;
    vertical-align: middle;
  }

  img{
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }

  :hover{
    background: #12876f;
  }
    
`;


