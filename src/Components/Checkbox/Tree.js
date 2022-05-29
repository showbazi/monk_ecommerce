import { useState } from "react";
import { Checkbox } from "./Checkbox";
import styled from "styled-components";

const foodItems = [
  "apples",
  "bananas",
  "oranges",
  "bread",
  "turkey",
  "tomatoes",
];

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 28px;
  padding-right: 24px;
  height: 62px;
`;

const ProductLabelContainer = styled.label`
  display: flex;
  align-items: center;
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

const ProductName = styled.span`
  margin-left: 14px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
`;

const ProductLabelSubContainer = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Tree = ({title, length, image, variants}) => {
  const [selected, setSelected] = useState([]);

  console.log("variants2",variants)

  return (
    <TreeContainer>
      
      <ProductLabelContainer>
        <Checkbox
          checked={selected.length === variants.length}
          indeterminate={
            selected.length > 0 && selected.length < variants.length
          }
          onChange={(event) => {
            if (event.target.checked) {
              setSelected(variants);
            } else {
              setSelected([]);
            }
          }}
          />
        {image ? <ProductImage src={image?.src}/> : <ImagePlaceholder/>}
        <ProductName>{title}</ProductName>
        </ProductLabelContainer>
        
          {variants &&(
            variants.map((item) => (
              <ProductLabelSubContainer>
                <Checkbox
                  checked={selected.includes(item)}
                  onChange={() => {
                    if (selected.includes(item)) {
                      setSelected((s) => s.filter((i) => i !== item));
                    } else {
                      setSelected((s) => [...s, item]);
                    }
                  }}
                  />
                  {item.title}
              </ProductLabelSubContainer>

            ))
          )}

          

            
      
      

      {/* {foodItems.map((item) => ( */}

      

      {/* ))} */}
    </TreeContainer>
  );
}


export default Tree;