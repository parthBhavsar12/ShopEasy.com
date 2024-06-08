import React from 'react';

export default function Bill() {
  return (
    <>

      <div className="items" id="updateItems">

        <form className="form">
          <span id="itemsTitle">Generate Bill</span>

            <label htmlFor="custName">Customer Name:</label>
            <input type="text" name="custName" id="custName" />

            <label htmlFor="itemName">Item Name:</label>
            <select name="itemName" id="itemName">
              <option value="NA">NA</option>
              <option value="abc">abc</option>
              <option value="xyz">xyz</option>
            </select>

          <label htmlFor="itemQuant">Item Quantity:</label>
          <input type="number" name="itemQuant" id="itemQuant" min="0"/>

          <label htmlFor="itemDiscount">Discount (%):</label>
          <input type="number" name="itemDiscount" id="itemDiscount" defaultValue="0" min="0"/>

          {/* <div className="buttonMerger"> */}
            <button type="submit" class="btnItem">Add to Bill</button>
            {/* <button type="reset" class="resetBtnItem">Reset</button> */}
          {/* </div> */}

        </form>

        <div className="tableContainer">
          <span id="itemsTitle">Items added to Bill</span>
          <table class="itemsTable">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>

            <tr>
              <td colSpan="4">Total Price Amount:</td>
              <td>Price</td>
            </tr>
          </table>
        </div>

      </div>

    </>
  )
}