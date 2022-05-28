import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useDebounce from '../hooks/useDebounce';
import closeIcon from "../assets/images/close.svg";
import searchIcon from "../assets/images/search.svg";

const DialogBackground = styled.div`
    position: absolute;
    width: 934px;
    height: 1027px;
    left: 253px;
    top: 75px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
`;

const DialogContainer = styled.div`
    background: #FFFFFF;
    padding-block: 14px;

    position: absolute;
    width: 663px;
    height: 612px;
    left: 136px;
    top: 177px;
    border-radius: 4px;
`;

const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 6.5px;
    padding-left: 28px;
    padding-right: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const DialogHeaderText = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: rgba(0, 0, 0, 0.9);
`;

const DialogHeaderCloseIcon = styled.img`
    color: rgba(0, 0, 0, 0.8);
    font-size: 17px;
    height: 17px;
    padding: 0 4px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

`;

const SearchBar = styled.div`
    margin-left: 28px;
    margin-right: 35px;
    margin-block: 0.5rem;
    height: 32px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.07);
`;

const SearchIcon = styled.img`
    color: rgba(0, 0, 0, 0.4);
    font-size: 17px;
    height: 17px;
    padding-left: 19px;
    margin-top: 3px;
`;

const SearchText = styled.input`
    outline: none;
    border: none;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    height: 21px;
    color: rgba(0, 0, 0, 0.5);
    margin-left: 13px;
    margin-bottom: 1px;
`;

const AddProductsForm = styled.form`
    width: 100%;
`;

const ProductsCardContainer = styled.div`

`;

const ProductsCard = styled.div`

`;


const ProductPicker = ({closeDialog}) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    // using the useDebounce custom hook to limit the calling of function
    const debouncedSearch = useDebounce(search, 500);

    const fetchData = () => {
        const {data} = fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${debouncedSearch}&page=1`)
            .then((res) => res.json())
            .then(result => {
                console.log("results", result);
                setProducts(result);
            })
            console.log("data", data)
            console.log()
        setProducts(data);
    }

    useEffect(() => {        
        fetchData();
    }, [debouncedSearch])
    
    return (
        <DialogBackground>
            <DialogContainer>
                <DialogHeader>
                    <DialogHeaderText> Select Products</DialogHeaderText>
                    <DialogHeaderCloseIcon src={closeIcon} alt="Close Icon" onClick={closeDialog}/>
                </DialogHeader>

                <SearchContainer>
                    <SearchBar>
                        <SearchIcon src={searchIcon} alt="search Icon" />

                        <SearchText placeholder='Search product' onChange={(e) => setSearch(e.target.value)}/>
                    </SearchBar>
                </SearchContainer>

                <AddProductsForm>
{/*                     
                    {products?.length > 0 && 
                        <div>{products.map((el, i) => 
                            <h3 key={el.id}>{el.title}</h3>
                            )}
                        </div>
                    } */}
                    <ProductsCardContainer>
                        {products?.length > 0 && 
                            (products.map(() => {
                                <ProductsCard>
                                    
                                </ProductsCard>
                            }))
                        }

                    </ProductsCardContainer>


                </AddProductsForm>


            </DialogContainer>
        </DialogBackground>
    )
}

export default ProductPicker