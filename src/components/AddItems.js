import React from 'react';

export default function AddItems() {
  return (
    <>
        <div className="addItems">
            <span id="addItemsTitle">Add Items</span>

            <label for="itemName">Item Name</label>
            <input type="text" name="itemName" id="itemName" />

            <label for="itemCat">Item Category</label>
            <input list="itemCats" name="itemCat" id="itemCat" />
            <datalist id="itemCats">
              <option value="NA">NA</option>
              <option value="abc">abc</option>
              <option value="xyz">xyz</option>
            </datalist>
        </div>
    </>
  )
}