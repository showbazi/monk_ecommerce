import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { MdDragIndicator } from "react-icons/md";
// import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";
import ProductCardForList from "./ProductCardForList";

//-------------------styles starts here-------------------------

const ProductListPage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const MainContainer = styled.div`
  margin-top: 67px;
  margin-right: 14rem;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 40%;
`;

const Heading = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #202223;
  flex: none;
  order: 0;
  flex-grow: 0;
  padding-inline: 3rem;
`;

const TableHeaders = styled.div`
  margin-top: 33px;
  display: flex;
  /* justify-content: space-between; */
  gap: 170px;
  margin-inline: 5.5rem;
`;

const TableHeadersText = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.9);
`;

const ItemsList = styled.ul`
  list-style: none;
  width: max-content;
`;

export const ItemsCardContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

export const ItemsCard = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  margin-left: ${props => props.marginLeft};
  width: max-content;
`;

export const DragIndicator = styled.img`
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  cursor: pointer;
`;

export const IndexNumber = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 13px;
`;

export const SelectProductButton = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding-inline: 10px;
  height: 32px;
  width: ${props => props.width};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${props => props.marginLeft};
  border-radius: ${props => props.borderRadius};
`;

export const SelectProductButtonText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${prop => prop.color};
  overflow: hidden;
  max-height: 32px;
  padding-block: ${prop => prop.paddingBlock};
`;

export const EditPen = styled.img`
  color: rgba(0, 0, 0, 0.2);
  font-size: 14.2px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const AddDiscountBtn = styled.div`
  background: #008060;
  border: 2px solid #008060;
  border-radius: 4px;
  height: 32px;
  padding-inline: 25px;
  margin-left: 13px;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  cursor: pointer;
`;

export const AddDiscountBtnText = styled.span`
  font-weight: 400;
  line-height: 20px;
  font-size: 14px;
  color: #ffffff;
`;

export const AddProductBtn = styled.div`
  border: 2px solid #008060;
  border-radius: 4px;
  height: 48px;
  padding-inline: 54px;
  width: max-content;
  display: flex;
  align-items: center;
  margin-top:  ${props => props.marginTop};
  /* margin-left: 15.3rem; */
  margin-left: ${props => props.marginLeft};
  margin-bottom: 10rem;
  cursor: pointer;
`;

export const AddProductBtnText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #008060;
`;

const Divider = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

//-------------------styles end here-------------------------

const initialArrayContent ={
  id: 1,
  title: null,
  variants: [],
  isDiscountOpen: false,
  isVariantShow: false
}

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}


const ProductList = () => {
  
  const [items, setItems] = useState([initialArrayContent]);
  const [addDiscountBtnState, setAddDiscountBtnState] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  // tempState for the varaints of the product
  const [tempState, setTempState] = useState([]);

  const [dragAndDrop, setDragAndDrop] = useState( initialDnDState );
  
  // the state to get the final selected products and their variants
  const [finalSelectedProducts, setFinalSelectedProducts] = useState([]);

  // add item to the list with the blank content
  const addItem = () => {
    const newArrayContent = {
      id: items.length + 1,
      title: "",
      variants: [],
      isDiscountOpen: false
    }
    setItems((prev) => [...prev , newArrayContent])
  };

  const handleUpdateItem = (id) => {
    const newItem = [...items];
    const index = newItem.find(item => item.id === id);
    const updatedItems = newItem.splice(id-1, 1, ...finalSelectedProducts);    
    setItems(newItem);
    setFinalSelectedProducts([]);
  }

  // handle the is discount open state
  const handleDiscountOpen = (singleItem) => {
    const newItem = [...items];
    const index = newItem.findIndex(
      (p) => p.id === singleItem.id
    );
    newItem[index].isDiscountOpen = !singleItem.isDiscountOpen;
    setItems(newItem);
    // to set the margin left for the add product button
    const newDiscountStateArray = items.map((item) => item.isDiscountOpen)
    console.log("newDiscountStateArray", newDiscountStateArray);
    for (let i = 0; i < newDiscountStateArray.length; i++) {
      if(newDiscountStateArray[i] === true){
        setAddDiscountBtnState(true);
      }
    }
    console.log("discount state", addDiscountBtnState);
  }

  // handle the delete of the item(product)
  const handleDeleteItem = (singleItem) => {
    const newItem = [...items]
    const index = newItem.findIndex(
      (p) => p.id === singleItem.id
    );
    console.log("index of deleted item", index);
    if (index !== -1) {
      newItem.splice(index, 1);
   }
   console.log("newItem of deleted item", newItem);
   setItems(newItem);
  };

  // handle the delete of the variant
  const handleDeleteVariant = (singleItem,variant) => {
    const newItem = [...items]
    const index = newItem.findIndex(
      (p) => p.id === singleItem.id
    );
    if(index !== -1){
      const newVariants = [...newItem[index].variants];
      const indexOfVariant = newVariants.findIndex(
        (p) => p.id === variant.id
      );
      newVariants.splice(indexOfVariant, 1);
      newItem[index].variants = newVariants;
      setItems(newItem);
    }
  }

  // handle show or hide the variant
  const handleVariantShow = (singleItem) => {
    const newItem = [...items]
    const index = newItem.findIndex(
      (p) => p.id === singleItem.id
    );
    newItem[index].isVariantShow = !singleItem.isVariantShow;
    setItems(newItem);
  }

  // -----------------------------------Drag and drop functions -----------------------------------
  // onDragStart fires when an element
  // starts being dragged
  const DragStart = (event) => {
      const initialPosition = Number(event.currentTarget.dataset.position);   
      setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: initialPosition,
        isDragging: true,
        originalOrder: items
      });
      //  Note: this is only for Firefox.
      // Without it, the DnD won't work.
      // But we are not using it.
      event.dataTransfer.setData("text/html", '');
  }


   // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const DragOver = (event) => {
    
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();
    
    let newList = dragAndDrop.originalOrder;
  
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom; 

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position); 

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo){
      setDragAndDrop({
       ...dragAndDrop,
       updatedOrder: newList,
       draggedTo: draggedTo
      })
     } 
  }

  const Drop = (event) => {
    setItems(dragAndDrop.updatedOrder); 
    setDragAndDrop({
     ...dragAndDrop,
     draggedFrom: null,
     draggedTo: null,
     isDragging: false
    });
  }

  const DragLeave = () => {
    setDragAndDrop({
    ...dragAndDrop,
    draggedTo: null
   });
  }



  
  return (
    <>
      <Navbar />

      <ProductListPage>
        <MainContainer>
          <Heading>Add Products</Heading>

          {items.length > 0 && (
            <TableHeaders>
              <TableHeadersText>Product</TableHeadersText>
              <TableHeadersText>Discount</TableHeadersText>
            </TableHeaders>
          )}

          {/*------------------ No Items Card Starts here---------------------- */}
          <ItemsList>
            {items.map((item, index) => (
              <>
                <ProductCardForList 
                    allItems={items}
                    setAllItems={setItems}
                    singleItem={item} 
                    index={index} 
                    finalSelectedProducts={finalSelectedProducts} 
                    setFinalSelectedProducts={setFinalSelectedProducts} 
                    handleUpdateItem={handleUpdateItem}  
                    key={item.id} 
                    isDiscountOpen={isDiscountOpen} 
                    setIsDiscountOpen={setIsDiscountOpen} 
                    handleDeleteItem={handleDeleteItem} 
                    handleDiscountOpen={handleDiscountOpen} 
                    handleDeleteVariant={handleDeleteVariant} 
                    handleVariantShow={handleVariantShow}
                    // handling the drag and drop functionalities
                    DragStart={DragStart}
                    DragOver={DragOver}
                    Drop={Drop}
                    DragLeave={DragLeave}
                    // for varaints
                    dragAndDrop={dragAndDrop}
                    setDragAndDrop={setDragAndDrop}
                />
                {items.length > index + 1 && <Divider/>}
              </>
            ))}
          </ItemsList>

          {/*------------------  Items Card Ends here-------------------------- */}

          <AddProductBtn 
              onClick={addItem} 
              marginLeft={addDiscountBtnState ? "18.65rem" : "15.3rem"} 
              marginTop={addDiscountBtnState ? "43px" : "21px"}
          >
              <AddProductBtnText>Add Product</AddProductBtnText>
          </AddProductBtn>
        </MainContainer>
      </ProductListPage>
    </>
  );
};

export default ProductList;
