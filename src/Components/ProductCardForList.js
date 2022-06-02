import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import dragIndicator from "../assets/images/drag-indicator.svg";
import editPen from "../assets/images/editPen.svg";
import { AddDiscountBtn, AddDiscountBtnText, DragIndicator, EditPen, IndexNumber, ItemsCard, ItemsCardContainer, SelectProductButton, SelectProductButtonText } from './ProductList'
import ProductPicker from './ProductPicker';
import closeIcon from "../assets/images/close.svg";
import arrowheadDown from "../assets/images/arrowheadDown.svg";
// import arrowheadUp from "../assets/images/arrowheadUp.svg";

// styles
const DiscountInputContainer = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
`;

const DiscountInput = styled.input`
    height: 32px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: 13px;
    outline: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
    padding-block: 5px;
    padding-left: 14px;
    padding-right: 37px;
    width: 69px;
    border-radius: ${props => props.borderRadius};
`;

const DiscountSelector = styled.select`
    display: flex;
    height: 31px;
    width: 95px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding-left: 13px;
    padding-right: 9.5px;
    outline: none;
    font-weight: 500;
    font-size: 14px;
    border-radius: ${props => props.borderRadius};
    background: #FFFFFF;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
`;

const DiscountOption = styled.option`
    /* height: 31px; */
    padding-top: 5px;
`;

const DeleteProductIcon = styled.img`
    color: rgba(0, 0, 0, 0.4);
    font-size: 11.67px;
    height: 11.67px;
    padding-left: 13px;
    cursor: pointer;
`;    

const ShowVariantsDiv = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-top: 6px;
    cursor: pointer;
`;

const ShowVariantsText = styled.span`
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-decoration: underline;
    color: #006EFF;
`;

const ShowVariantsIcon = styled.img`
    padding-top: ${props => props.paddingTop};
    color: rgba(0, 0, 0, 0.4);
    transform: ${props => props.transform};
    margin-left: 2px;
`;

// styles

const ProductCardForList = ({allItems, setAllItems, singleItem, index, handleDiscountOpen, handleUpdateItem, handleDeleteItem, handleDeleteVariant, handleVariantShow, finalSelectedProducts, setFinalSelectedProducts, DragStart,
    DragOver,
    Drop,
    DragLeave,
    dragAndDrop,
    setDragAndDrop
}) => {

        const [variantsForDrag, setVariantsForDrag] = useState(singleItem.variants);

        // console.log('variantsForDrag', variantsForDrag);

        useEffect(() => {
            const newAllItems = [...allItems];
            if(variantsForDrag.length > 0) {
                const index = allItems.findIndex(item => item.id === variantsForDrag[0].product_id);
                newAllItems[index].variants = variantsForDrag;
            }
            setAllItems(newAllItems);
        }, [variantsForDrag]);

        // const updatingTheItemsList = () => {
        //     localStorage.setItem('items', JSON.stringify(variantsForDrag));
        // }

        // useEffect(() => {
        //     updatingTheItemsList();
        // }, [variantsForDrag]);

        const DragStartOfVariants = (event) => {
            event.stopPropagation();
            // event.preventDefault();

            const initialPosition = Number(event.currentTarget.dataset.position);   
            setDragAndDrop({
              ...dragAndDrop,
              draggedFrom: initialPosition,
              isDragging: true,
              originalOrder: variantsForDrag
            });
            //  Note: this is only for Firefox.
            // Without it, the DnD won't work.
            // But we are not using it.
            event.dataTransfer.setData("text/html", '');
            console.log('DragStartOfVariants');
        }

        
  const DropOfVariants = (event) => {
        event.stopPropagation();
        setVariantsForDrag(dragAndDrop.updatedOrder); 
        setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: null,
        draggedTo: null,
        isDragging: false
        });
        console.log("draggedTo", dragAndDrop.draggedTo);
        console.log("draggedTo", dragAndDrop.updatedOrder);
        console.log("DropOfVariants");
  }

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    console.log("all items", allItems);
    
    return (
        <>
            <ItemsCardContainer 
                draggable={true} 
                data-position={index}
                onDragStart={DragStart}
                onDragOver={DragOver}
                onDrop={Drop}
                onDragLeave={DragLeave}
            >
                <ItemsCard marginLeft = "2rem"
                >
                    <DragIndicator src={dragIndicator} alt="drag indicator" />

                    <IndexNumber>{index + 1}.</IndexNumber>

                    <SelectProductButton width="215px" marginLeft="8px">
                        <SelectProductButtonText paddingBlock="5.2px" color={singleItem?.title ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)"} >
                            {singleItem?.title ? singleItem.title : "Select Product"}
                        </SelectProductButtonText>

                        <EditPen
                            src={editPen}
                            alt="edit pen"
                            onClick={() => setIsDialogOpen(true)}
                        />
                    </SelectProductButton>

                    {!singleItem.isDiscountOpen ? (
                        <AddDiscountBtn onClick={() => handleDiscountOpen(singleItem)}>
                            <AddDiscountBtnText >Add Discount</AddDiscountBtnText>
                        </AddDiscountBtn>
                    ) : (
                        <DiscountInputContainer>
                            <DiscountInput type="text" inputmode="numeric" />
                            <DiscountSelector>
                                <DiscountOption value="0">% Off</DiscountOption>
                                <DiscountOption value="1">Flat Off</DiscountOption>
                            </DiscountSelector>

                            {allItems.length > 1 ? (
                                <DeleteProductIcon src={closeIcon} alt="delete product" onClick={() => handleDeleteItem(singleItem)} />
                            ) : null}
                        </DiscountInputContainer>
                    )}
                    
                </ItemsCard>

                {singleItem?.variants && singleItem.variants.length > 1 ? (
                    <ShowVariantsDiv onClick={() => handleVariantShow(singleItem)}>
                        {!singleItem?.isVariantShow ? (
                            <>
                                <ShowVariantsText>Show variants</ShowVariantsText>
                                <ShowVariantsIcon paddingTop="5px" src={arrowheadDown} alt="show variants" />
                            </>
                        ) : (
                            <>
                                <ShowVariantsText>Hide variants </ShowVariantsText>
                                <ShowVariantsIcon paddingTop="1px" transform="rotate(-180deg)" src={arrowheadDown} alt="show variants" />
                            </>
                        )}
                            
                    </ShowVariantsDiv>
                    
                ) : null
                }

                {singleItem?.variants && singleItem?.isVariantShow && (
                    singleItem?.variants.map((variant, index) => (
                        <ItemsCard 
                            key={variant.id}
                            marginLeft="5.2rem"
                            draggable={true} 
                            data-position={index}
                            onDragStart={DragStartOfVariants}
                            onDragOver={DragOver}
                            onDrop={DropOfVariants}
                            onDragLeave={DragLeave}
                        >
                            <DragIndicator src={dragIndicator} alt="drag indicator" />
                            <SelectProductButton width="184px" marginLeft="11px" borderRadius="30px">
                                <SelectProductButtonText paddingBlock="5.25px" color={singleItem?.title ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)"} >
                                    {variant?.title}
                                </SelectProductButtonText>
                            </SelectProductButton>
                                <DiscountInputContainer>
                                    <DiscountInput type="text" inputmode="numeric" borderRadius="30px"/>
                                    <DiscountSelector borderRadius="30px">
                                        <DiscountOption value="0">% Off</DiscountOption>
                                        <DiscountOption value="1">Flat Off</DiscountOption>
                                    </DiscountSelector>
                                </DiscountInputContainer>
                            <DeleteProductIcon 
                                src={closeIcon}
                                alt="Close Icon"
                                onClick={() => handleDeleteVariant(singleItem, variant)}
                            />
                        </ItemsCard>
                    ))
                )}
            </ItemsCardContainer>
            
          {/*------------------ Modal Starts here-------------------------- */}
          {isDialogOpen && (
            <ProductPicker closeDialog={() => setIsDialogOpen(false)} handleUpdateItem={handleUpdateItem} finalSelectedProducts={finalSelectedProducts} setFinalSelectedProducts={setFinalSelectedProducts} singleItem={singleItem}/>
          )}

          {/*------------------ Modal Ends here-------------------------- */}

        </>
    )
}

export default ProductCardForList