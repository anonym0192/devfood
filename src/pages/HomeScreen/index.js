import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import Modal from '../../components/Modal';
import ProductModal from '../../components/ProductModal';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import ReactToolTip from 'react-tooltip';
import { 
    Container,  
    CategoryArea, 
    CategoryList,
    ProductArea,
    ProductList,
    PaginationArea,
    PaginationItem } from './styled';

export default () => {
    
    //const query = new URLSearchParams(useLocation().search);

    
    const [categoriesList, setCategoriesList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    
    const [activeCategory, setActiveCategory] = useState('');
    const [activePage, setActivePage] = useState(1);
    
    const activeSearch = useSelector(state=>state.search.searchValue);

    const [modalStatus, setModalStatus] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

    
    const getProducts = async ()=>{

        const json = await api.getProducts(activeCategory, activePage, activeSearch);

        if(!json.error){
            setProductsList(json.products);
            setTotalPages(json.total_pages || '');
            //if(json.current_page > 1){
               // setActivePage(json.current_page); 
                
            //}           
        } 
    }
     
    useEffect(()=>{

        const getCategories = async ()=>{
            const json = await api.getCategories();
            if(!json.error){
                setCategoriesList(json.categories || []);  
                
                
            }  
            ReactToolTip.rebuild();      
        }
        getCategories();        
    }, []);

    useEffect(()=>{
        getProducts(activeCategory, activePage, activeSearch);
    }, [activeCategory, activePage, activeSearch]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setModalStatus(true);
    }

    return (
        <Container>
            {categoriesList.length > 0 &&
                <CategoryArea>                  
                        Selecione uma categoria
                        <CategoryList>
                            <CategoryItem data={{
                                    id: 0,
                                    image: '/assets/images/food-and-restaurant.png',
                                    name: 'Todos os Itens' 
                                }}
                                key={0} 
                                activeCategory={activeCategory} setActive={setActiveCategory} />

                            {categoriesList.map(item=>(
                               <CategoryItem 
                                    data={item} key={item.id} 
                                    activeCategory={activeCategory}
                                    setActive={setActiveCategory} /> 
                            ))}                        
                        </CategoryList>          
                </CategoryArea>
            }

            {productsList.length > 0 &&
                <ProductArea>
                    <ProductList>
                        {productsList.map((item, key)=>(
                            <ProductItem data={item} key={key} onClick={handleProductClick} />
                        ))}        
                    </ProductList>
                </ProductArea>
            }
            {totalPages > 1 &&
                <PaginationArea>
                    {Array(totalPages).fill(0).map((item, index)=>(
                        <PaginationItem 
                            key={index} 
                            current={index+1} 
                            active={activePage}
                            onClick={()=>setActivePage(index+1)}>
                                {index+1}
                        </PaginationItem>
                    ))}
                </PaginationArea>
            }

            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ProductModal data={selectedProduct} status={modalStatus} setStatus={setModalStatus}/>
            </Modal>
        </Container>
    );
}