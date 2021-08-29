import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useSelector ,useDispatch} from 'react-redux';
import {HeaderArea, Logo , SearchInput, UserMenu} from './style.js';

let searchTimer = null;

export default () =>{

    const [searchValue, setSearchValue] = useState('');
    const [active, setActive] = useState(false);

    const user = useSelector(state=>state.user.userData);
    const token = useSelector(state=>state.user.token);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleInputFocus = ()=>{
        setActive(true);
    }
    const handleInputBlur = ()=>{
        if(searchValue?.trim() === ''){
            setActive(false);
        }     
    }

    const handleInputChange = (e) =>{

        const input = e.target.value?.trim();
        
        setSearchValue(input);
        
        if(searchTimer){
            clearTimeout(searchTimer);
        }
        
        searchTimer = setTimeout(() => {
            history.push('/');
            dispatch({
                type: 'SET_SEARCH',
                payload: {searchValue: input}
            }); 
            
        },2000); 
    }

    
    return (
        <>
        <HeaderArea>
            <Link to="/">
                <Logo src="/assets/images/logo.png" />
            </Link>
            <SearchInput 
                placeholder='O que você busca ?'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e)=>handleInputChange(e)}
                //onKeyUp={(e)=>handleInputKeyup(e)}
                active={active}
                value={searchValue}
            />
        </HeaderArea>
        
        
        <UserMenu>            
                {user &&
                    <> 
                        <li><Link to="/profile">{user.email}</Link></li>
                        <li><Link to="/logout">  Sair</Link></li>
                    </>
                }
                {!user && 
                    <>
                        <li><Link to="/login">  Entrar </Link></li>
                        <li><Link to="/register"> Cadastrar </Link></li>
                    </>
                }
            </UserMenu>
        
        
        </>
    )
}