import styled from 'styled-components';

export const LinkArea = styled.a`
display: block;
line-height: 80px;
width: 60px;
height: 60px;
background-color: ${props=> props.active ? '#0b4e0b' : 'transparent'};
text-align: center;
border-radius: 10px;
margin-bottom: 15px;
`;

export const LinkIcon = styled.img`
width: 34px;
height: auto;
`;