import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import closeIcon from "../assets/images/close.svg";
import searchIcon from "../assets/images/search.svg";
// import tickIcon from "../assets/images/tick.svg";
import Tree  from "./Checkbox/Tree";

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
  background: #ffffff;
  padding-top: 14px;

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

const ProductsCardContainer = styled.ul`
  list-style: none;
  overflow-y: scroll;
  height: 467px;

  &::-webkit-scrollbar{
    width: 10px;
  }
  
  &::-webkit-scrollbar-track{
    height: 56px;
    width: 6px;
    border-radius: 1px;
    /* background-color: red; */
    /* box-shadow: inset 0 0 10px 10px red; */
    border-right: solid 4px transparent;
  }
  
  &::-webkit-scrollbar-thumb{
    width: 6px;
    border-radius: 1px;
    box-shadow: inset 0 0 6px 6px #6D7175;
    border-right: solid 4px transparent;
  }

`;

const ProductsCard = styled.li`
  /* position: relative; */
`;

// const MainCheckbox = styled.input`
//   appearance: none;
//   width: 24px;
//   height: 24px;
//   border: 1px solid rgba(0, 0, 0, 0.8);
//   border-radius: 4px;

//   &:checked {
//     background: #008060;
//     border: none;
//   }
// `;

// const TickIcon = styled.img`
//   width: 14.4px;
//   height: 12px;
//   background: url(src\assets\images\tick.svg);
//   position: absolute;
//   top: 6px;
//   left: 5px;
//   color: red;
//   background-color: red;
// `;

const DialogFooter  = styled.div`
  padding-left: 28px;
  padding-right: 24px;
  display: flex;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const DialogFooterText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
`;

const DialogFooterButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DialogFooterAddButton = styled.button`
  padding: 6px 22px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ffff;
  border: none;
  background: #008060;
  border-radius: 4px;
`;

const DialogFooterCancelButton = styled.button`
  height: 32px;
  padding: 6px 28px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;

// default page number
const PAGE_NUMBER = 1;

// component starts here
const ProductPicker = ({ closeDialog, finalSelectedProducts, setFinalSelectedProducts, handleUpdateItem , singleItem}) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  // const [isChecked, setIsChecked] = useState(false);
  const [page, setPage] = useState(PAGE_NUMBER);
  const loader = useRef(null);
  const parentElement = useRef(null); // parent element of the dialog for activating infinite scroll event

  // // the state to get the final selected products and their variants
  // const [finalSelectedProducts, setFinalSelectedProducts] = useState([]);


// To submit the selected products in local storage
const submitSelectedProducts = (e) => {
  e.preventDefault();
  // localStorage.setItem("selectedProducts", JSON.stringify(finalSelectedProducts));
  closeDialog();
  handleUpdateItem(singleItem.id);
};
  

  // ---------------handle Selected Products------------------
  const handleSelectedProducts = (product) => {
    const newSelectedProducts = [...finalSelectedProducts];
    // find the index of the product to be added
    const index = newSelectedProducts.findIndex(
      (p) => p.id === product.id
    );
    if (index === -1) {
      newSelectedProducts.push(product);
    }
    setFinalSelectedProducts(newSelectedProducts); 
  // {console.log("final selected in product picker", finalSelectedProducts)}
  };

  // ---------------handle deselcted products---------------------
  const handleDeselectedProducts = (product) => {
    const newSelectedProducts = [...finalSelectedProducts];
    // find the index of the product to be removed
    const index = newSelectedProducts.findIndex(
      (p) => p.id === product.id
    );
    if (index !== -1) {
       newSelectedProducts.splice(index, 1);
    }
    setFinalSelectedProducts(newSelectedProducts);
  };

  // ------------------handle selected variants----------------------
  const handleSelectedVariants = (variant) => {
    const newSelectedProducts = [...finalSelectedProducts];
    // find the index of the product to be added
    const productOfVariant = products.find(
      (p) => p.id === variant.product_id
    );
    const selectedVariant = productOfVariant.variants.find(
      (v) => v.id === variant.id
    );
    const index = newSelectedProducts.findIndex(
      (p) => p.id === variant.product_id
    );
    if (index === -1) {
      newSelectedProducts.push({
        id: productOfVariant.id,
        title: productOfVariant.title,
        variants: [selectedVariant],
      });
    }else if(index !== -1  ){
      newSelectedProducts.map((p) => {
        if(p.id === variant.product_id){
          p.variants.push(selectedVariant);
        }
      });
    }
    setFinalSelectedProducts(newSelectedProducts);
    // console.log("product in selected variants", productOfVariant);
    // console.log("selected variants", selectedVariant);
  };

  //-------------- handle deselcted variants-------------------
  const handleDeselectedVariants = (variant) => {
    const newSelectedProducts = [...finalSelectedProducts];
    const productToDeselectVaraint = newSelectedProducts.find((p) => {
      return p.id === variant.product_id;
    });
    const index = newSelectedProducts.findIndex(
      (p) => p.id === variant.product_id
    );
    if(index !== -1 && productToDeselectVaraint.variants.length === 1){
      newSelectedProducts.splice(index, 1);
    }
    else if(index !== -1) {
      const variantToDeselect = productToDeselectVaraint.variants.splice(
        productToDeselectVaraint.variants.findIndex((v) => v.id === variant.id),
        1
      );
      // const variantToDeselect = productToDeselectVaraint.variants.find(
      //   (v) => v.id === variant.id
      // );
      // setFinalSelectedProducts(variantToDeselect);
      
      // console.log("variant to deselect", variantToDeselect);
      // console.log("product to deselect variant", productToDeselectVaraint);
    }
    
    
    setFinalSelectedProducts(newSelectedProducts);
  };

  // ---------------using the useDebounce custom hook to limit the calling of function----------------
  const debouncedSearch = useDebounce(search, 500);

  const fetchData = () => {
    const data = fetch(
      `https://stageapibc.monkcommerce.app/admin/shop/product?search=${debouncedSearch}&page=${page}`,
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log("results", result);
        if(!debouncedSearch){
            if(products?.length > 0){
              if(result?.map((p) => p.id).every((id) => products.map((p) => p.id).includes(id))){
                return;
              }
              setProducts((prev) => [...prev, ...result]);
            }else {
              setProducts(result);
            }
        }else {
          setProducts(result);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearch, page]);

  // const scrollToBottom = () => {
  //   setPage((prev) => prev + 1)
  // }

  // window.onscroll = function (){
  //   // we will check if the page is scrolled to the bottom of the results
  //   if(window.innerHeight + document.documentElement.scrollTop ===  document.documentElement.offsetHeight){
  //       scrollToBottom();
  //       console.log("page",page);
  //   }
  // }

  // console.log("products", products);
  
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    // const parent = parentElement.current;
    // tried to use the intersection observer on parent element i.e. on AddProductsForm by using useref on it with parentElement and accessed its current value (parentElement.current) but it was not working so implemented the below code

    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    // console.log("parent element", parentElement.current);
    // console.log("loader current",loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <DialogBackground>
      <DialogContainer>
        <DialogHeader>
          <DialogHeaderText> Select Products</DialogHeaderText>
          <DialogHeaderCloseIcon
            src={closeIcon}
            alt="Close Icon"
            onClick={closeDialog}
          />
        </DialogHeader>

{/* Search Container */}
        <SearchContainer>
          <SearchBar>
            <SearchIcon src={searchIcon} alt="search Icon" />
            <SearchText
              placeholder="Search product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBar>
        </SearchContainer>

{/* Product Form-- where we display all products and then select them */}
        <AddProductsForm  ref={parentElement}>
          <ProductsCardContainer>
            {products?.length > 0 &&
              products.map((el, i) => {
                return (
                  <ProductsCard key={el.id}>
                    <Tree 
                        productData={el}
                        finalSelectedProducts={finalSelectedProducts} 
                        // ----------------------select and deselect products and variants----------------------
                        handleSelectedProducts={handleSelectedProducts}
                        handleDeselectedProducts={handleDeselectedProducts} 
                        handleSelectedVariants={handleSelectedVariants}
                        handleDeselectedVariants={handleDeselectedVariants}
                    />
                  </ProductsCard>
                );
              })}
              {/* to initiate the infinite scrolling/pagination I am using this div so that when this div comes in viewport, we will fire the api query with updated page number */}
          </ProductsCardContainer>
              <div ref={loader} id="loader" />

   {/* {console.log("final selected in tree", finalSelectedProducts)} */}


{/* footer of the form and the dialog box*/}
          <DialogFooter>
              <DialogFooterText>
                {finalSelectedProducts?.length} Product Selected
              </DialogFooterText>
              <DialogFooterButtonContainer>
                  <DialogFooterCancelButton type="button" onClick={closeDialog}>
                      Cancel
                  </DialogFooterCancelButton>
                  <DialogFooterAddButton onClick={submitSelectedProducts}>
                      Add
                  </DialogFooterAddButton>
              </DialogFooterButtonContainer>
          </DialogFooter>

        </AddProductsForm>
      </DialogContainer>
    </DialogBackground>
  );
};

export default ProductPicker;
