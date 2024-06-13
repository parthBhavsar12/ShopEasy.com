import React, { useRef } from 'react';

export default function ManageItems() {
  const addItemsForm = useRef();
  const updateItemsForm = useRef();

  const moveToUpdateItems = ()=>{
    addItemsForm.current.style.display = 'none';
    updateItemsForm.current.style.display = 'grid';
  }

  const moveToAddItems = ()=>{
    updateItemsForm.current.style.display = 'none';
    addItemsForm.current.style.display = 'grid';
  }

  return (
    <>
        <div className="items" id="addItems">

            <form className="form" ref={addItemsForm}>
              
              <div className="buttonMerger">
                <input type="button" id="actionItemsLeft" value="Add Items" class="green underline"/>
                <input type="button" id="actionItemsRight" value="Update Items"  class="red" onClick={moveToUpdateItems}/>
              </div>
              
                <label htmlFor="itemName">Item Name:</label>
                <input type="text" name="itemName" id="itemName" />
              
                <label htmlFor="itemCat">Item Category:</label>
                <select name="itemCat" id="itemCat">
                  <option value="NA">NA</option>
                  <option value="abc">abc</option>
                  <option value="xyz">xyz</option>
                </select>
              
                <label htmlFor="itemPrice">Item Price:</label>
                <input type="number" name="itemPrice" id="itemPrice" min="0"/>
              
              <label htmlFor="itemQuant">Item Quantity:</label>
              <input type="number" name="itemQuant" id="itemQuant" min="0"/>

              <button type="submit" class="btnItem">Add Item</button>

            </form>

            <form className="form" ref={updateItemsForm} id="updateItemsForm">

              <div className="buttonMerger">
                <input type="button" id="actionItemsLeft" value="Add Items" class="red" onClick={moveToAddItems}/>
                <input type="button" id="actionItemsRight" value="Update Items"  class="green underline"/>
              </div>

                <label htmlFor="itemName">Item Name:</label>
                <select name="itemName" id="itemName">
                  <option value="NA">NA</option>
                  <option value="abc">abc</option>
                  <option value="xyz">xyz</option>
                </select>
              
              <label htmlFor="itemCat">Item Category:</label>
                <select name="itemCat" id="itemCat">
                  <option value="NA">NA</option>
                  <option value="abc">abc</option>
                  <option value="xyz">xyz</option>
                </select>

                <label htmlFor="itemPrice">Item Price:</label>
                <input type="number" name="itemPrice" id="itemPrice" min="0"/>

              <label htmlFor="itemQuant">Item Quantity:</label>
              <input type="number" name="itemQuant" id="itemQuant" min="0"/>

              <button type="submit" class="btnItem">Update Item</button>

            </form>

            <div className="tableContainer">
              <span id="itemsTitle">Items</span>
              <table class="itemsTable">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Category</td>
                  <td>Quantity</td>
                </tr>
              </table>
            </div>

        </div>
    </>
  )
}