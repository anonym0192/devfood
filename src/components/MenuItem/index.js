import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { LinkArea, LinkIcon } from './style';

export default ({link, icon, title})=>{

    const history = useHistory();
    const location = useLocation();
    
    const isActive = location.pathname === link;

    const handleLinkClick = (e)=>{
        e.preventDefault();
        history.push(link);
    };

    return (
        <LinkArea data-tip={title} data-for="tip-right" active={isActive} href={link} onClick={handleLinkClick}>
            <LinkIcon src={icon} alt="menu icon"/>
        </LinkArea>
    );
}