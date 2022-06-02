import { useState } from "react";
import { Checkbox, CustomCheckbox } from "./Checkbox";
import styled from "styled-components";

// const foodItems = [
//   "apples",
//   "bananas",
//   "oranges",
//   "bread",
//   "turkey",
//   "tomatoes",
// ];

const TreeContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  width: 100%;
  height: 62px;
  position: relative;
  padding-left: ${prop => prop.padding};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);  
`;

const ProductLabelContainer = styled.label`
  display: flex;
  align-items: center;

  /* &::before{
    content: "";
    width: 24px;
    height: 24px;
    border-radius: 4px;
    
      ${CustomCheckbox}:hover & {
        background-color: red;
      }
      &:hover{
          background-color: red;
      }
  } */

  /* &::hover:before {
    background-color: red;

  } */
`;

const ProductImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  margin-left: 15px;
`;

const ImagePlaceholder = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  margin-left: 15px;
  margin-right: 0;
`;

const ProductLabelSubContainer = styled.label`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 4fr 1.7fr 0.5fr;

  /* &::before{
    content: "";
    width: 24px;
    height: 24px;
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 4px;
  } */
`;

const ProductName = styled.p`
  margin-left: ${prop => prop.margin};;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
  padding-right: 36px;
`;

const ProductVariantQuantity = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
  padding-right: 36px;
  min-width: 145px;
  text-align: right;
`;

const ProductVariantPrice = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  min-width: 70px;
  color: rgba(0, 0, 0, 0.9);
  padding-right: 25px;
`;

// const Tree = ({title, image, variants, productData}) => {
const Tree = ({productData, handleSelectedProducts, finalSelectedProducts, handleDeselectedProducts, handleSelectedVariants, handleDeselectedVariants }) => {
  const [selected, setSelected] = useState([]);

  // {console.log("final selected in tree", finalSelectedProducts)}

  // const handleProductCheckboxChange = (e, productData, allProducts) => {
  //   console.log("allProducts", allProducts);
  //   if(e.target.checked){
  //     setSelected(productData?.variants);
  //     // console.log("allProducts", allProducts);
  //     const product = allProducts.find(product => product.id === productData.id);
  //     console.log("product",product);
  //     setFinalSelected((prevSelected) => (
  //       console.log("prevSelected", prevSelected),
  //       [...prevSelected, product]));
  //   } else {
  //     // setSelected(selected.filter(item => item.id !== productData?.variants.id));
  //     setSelected([]);
  //   }

      // const newSelected = [...selected];
      // const newFinalSelected = [...finalSelected];
      // const index = newSelected.indexOf(id);
      // if (index === -1) {
      //     newSelected.push(id);
      //     newFinalSelected.push(productData[id]);
      // } else {
      //     newSelected.splice(index, 1);
      //     newFinalSelected.splice(index, 1);
      // }
      // setSelected(newSelected);
      // setFinalSelected(newFinalSelected);

      // console.log(newSelected);
      // console.log(newFinalSelected);
    // }
    // console.log("selected in handle change", finalSelected);

  return (
    <>
        <TreeContainer padding="28px">
            <Checkbox
                  checked={selected.length === productData?.variants?.length}
                  indeterminate={
                    selected.length > 0 && selected.length < productData?.variants.length
                  }
                  onChange={
                    (event) => {
                    if (event.target.checked) {
                      setSelected(productData?.variants);
                      handleSelectedProducts(productData);
                    } else {
                      setSelected([]);
                      // setFinalSelected((s) => s.filter((i) => i.product_id !== productData?.varaints?.product_id));
                      handleDeselectedProducts(productData);
                    }
                  }
                  // (event) => handleProductCheckboxChange(event, productData, allProducts)
                }
                />
            {/* {console.log("final selected varaints", finalSelected)} */}
            {/* {console.log("selected variants",selected)}
  {console.log("final selected in tree 2", finalSelectedProducts)} */}

            <ProductLabelContainer>
                  {productData?.image ? <ProductImage src={productData?.image?.src}/> : <ImagePlaceholder/>}
                  <ProductName margin="14px">{productData?.title}</ProductName>
            </ProductLabelContainer>
        </TreeContainer>

          {productData?.variants &&(
            productData?.variants.map((item) => (
              <TreeContainer padding="70px" key={item.id}>
                  <Checkbox
                  checked={selected.includes(item)}
                  onChange={() => {
                      if (selected.includes(item)) {
                        setSelected((s) => s.filter((i) => i !== item));
                        handleDeselectedVariants(item);
                        // setFinalSelected((s) => s.filter((i) => i !== item));
                      } else {
                        setSelected((s) => [...s, item]);
                        handleSelectedVariants(item);
                        // setFinalSelected((s) => [...s, item]);
                      }
                  }}
                  />
                  <ProductLabelSubContainer>
                      <ProductName margin="14px">{item?.title}</ProductName>
                      <ProductVariantQuantity>{item?.inventory_quantity ? item?.inventory_quantity : "Not"} available</ProductVariantQuantity>
                      <ProductVariantPrice>${item?.price}</ProductVariantPrice>
                  </ProductLabelSubContainer>
              </TreeContainer>
            ))
          )}

      {/* {foodItems.map((item) => ( */}
      {/* ))} */}
    </>
  );
}


export default Tree;