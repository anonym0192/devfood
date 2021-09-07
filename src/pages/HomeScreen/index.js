import React, {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import Modal from '../../components/Modal';
import ProductModal from '../../components/ProductModal';
import PaginationArea from '../../components/PaginationArea';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import {NotFoundMessage} from '../../AppStyled';
import ReactToolTip from 'react-tooltip';
import { 
    Container,  
    CategoryArea, 
    CategoryList,
    ProductArea,
    ProductList
} from './styled';

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

    const [loading, setLoading] = useState(true);

    
    const getProducts = async ()=>{

        setLoading(true);

        const json = await api.getProducts(activeCategory, activePage, activeSearch);

        if(!json.error){
            setProductsList(json.products || []);
            setTotalPages(json.total_pages || '');     
        } 

        setLoading(false);
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
    }, [activePage, activeSearch]);

    useEffect(()=>{
        setActivePage(1);
        getProducts(activeCategory, 1, activeSearch);
    }, [activeCategory]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setModalStatus(true);
    }

    return (
        <Container>
            {categoriesList.length > 0  && 
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

            { loading && <Loading width="50" height="50" /> }

            {productsList.length > 0 && !loading &&
                <ProductArea>
                    <ProductList>
                        {productsList.map((item, key)=>(
                            <ProductItem data={item} key={key} onClick={handleProductClick} />
                        ))}        
                    </ProductList>
                </ProductArea>
            }
            {productsList.length > 0 && totalPages > 1  && !loading &&
                <PaginationArea totalPages={totalPages} activePage={activePage} setActivePage={setActivePage} />
            }

            {productsList?.length == 0 && !loading &&
                    <NotFoundMessage>Nenhum item encontrado</NotFoundMessage>
            }

            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ProductModal data={selectedProduct} status={modalStatus} setStatus={setModalStatus}/>
            </Modal>
        </Container>
    );
}