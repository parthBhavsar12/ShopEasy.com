import React from 'react';

export default function AddItems() {
  return (
    <>
        <div className="addItems">
            <span id="addItemsTitle">Add Items</span>

            <label for="itemName">Item Name</label>
            <input type="text" name="itemName" id="itemName" />

            <label for="itemCat">Item Category</label>
            <input type="" name="itemCat" id="itemCat" />
        </div>
    </>
  )
}