import React, { useState } from "react";
import styled from "styled-components";
// import { MdDragIndicator } from "react-icons/md";
// import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar";
import dragIndicator from "../assets/images/drag-indicator.svg";
import editPen from "../assets/images/editPen.svg";
import ProductPicker from "./ProductPicker";

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
  /* identical to box height, or 150% */

  /* Text/Default */
  color: #202223;

  /* Inside auto layout */
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

const NoItemsCard = styled.li`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  margin-left: 2rem;
  list-style: none;
  width: max-content;
`;

// const DragIndicatorIcon = styled.div`
//     color: rgba(0, 0, 0, 0.5);
//     font-size: 20px;
//     display: flex;
//     align-items: center;
// `;

const DragIndicator = styled.img`
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  /* display: flex;
    align-items: center; */
  cursor: pointer;
`;

const IndexNumber = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 13px;
`;

const SelectProductButton = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding-inline: 10px;
  height: 32px;
  width: 215px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 8px;
`;

const SelectProductButtonText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.5);
`;

const EditPen = styled.img`
  color: rgba(0, 0, 0, 0.2);
  font-size: 14.2px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const AddDiscountBtn = styled.div`
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

const AddDiscountBtnText = styled.span`
  font-weight: 400;
  line-height: 20px;
  font-size: 14px;
  color: #ffffff;
`;

const AddProductBtn = styled.div`
  border: 2px solid #008060;
  border-radius: 4px;
  height: 48px;
  padding-inline: 54px;
  width: max-content;
  display: flex;
  align-items: center;
  margin-top: 21px;
  margin-left: 15.3rem;
  cursor: pointer;
`;

const AddProductBtnText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #008060;
`;
//-------------------styles end here-------------------------

const ProductList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState("");

  const addItem = () => {
    const newItem = items.concat({ productName });
    setItems(newItem);
  };

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
              <NoItemsCard>
                <DragIndicator src={dragIndicator} alt="drag indicator" />

                <IndexNumber>{index + 1}.</IndexNumber>

                <SelectProductButton>
                  <SelectProductButtonText>
                    {item.productName ? item.productName : "Select Product"}
                  </SelectProductButtonText>

                  <EditPen
                    src={editPen}
                    alt="edit pen"
                    onClick={() => setIsDialogOpen(true)}
                  />
                </SelectProductButton>

                <AddDiscountBtn>
                  <AddDiscountBtnText>Add Discount</AddDiscountBtnText>
                </AddDiscountBtn>
              </NoItemsCard>
            ))}
          </ItemsList>

          {/*------------------ No Items Card Ends here-------------------------- */}

          {/*------------------ Modal Starts here-------------------------- */}
          {isDialogOpen && (
            <ProductPicker closeDialog={() => setIsDialogOpen(false)} />
          )}

          {/*------------------ Modal Ends here-------------------------- */}

          <AddProductBtn onClick={addItem}>
            <AddProductBtnText>Add Product</AddProductBtnText>
          </AddProductBtn>
        </MainContainer>
      </ProductListPage>
    </>
  );
};

export default ProductList;
