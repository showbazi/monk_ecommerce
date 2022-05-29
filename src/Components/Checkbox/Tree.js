import { useState } from "react";
import { Checkbox } from "./Checkbox";

const groceryList = [
  "apples",
  "bananas",
  "oranges",
  "bread",
  "turkey",
  "tomatoes",
];

export default function Tree() {
  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
      <label className="select-all">
        <Checkbox
          checked={selected.length === groceryList.length}
          indeterminate={
            selected.length > 0 && selected.length < groceryList.length
          }
          onChange={(event) => {
            if (event.target.checked) {
              setSelected(groceryList);
            } else {
              setSelected([]);
            }
          }}
        />
        Select all
      </label>

      {groceryList.map((item) => (
        <label className="item">
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
          {item}
        </label>
      ))}
    </div>
  );
}
