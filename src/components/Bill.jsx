import React from 'react';

export default function Bill() {
  return (
    <>

      <div className="products" id="updateProducts">

        <form className="form">
          <span id="productsTitle">Generate Bill</span>

            <label htmlFor="custName">Customer Name:</label>
            <input type="text" name="custName" id="custName" />

            <label htmlFor="productName">Product Name:</label>
            <select name="productName" id="productName">
              <option value="NA">NA</option>
              <option value="abc">abc</option>
              <option value="xyz">xyz</option>
            </select>

          <label htmlFor="productQuant">Product Quantity:</label>
          <input type="number" name="productQuant" id="productQuant" min="0"/>

          <label htmlFor="productDiscount">Discount (%):</label>
          <input type="number" name="productDiscount" id="productDiscount" defaultValue="0" min="0"/>

          {/* <div className="buttonMerger"> */}
            <button type="submit" class="btnProduct">Add to Bill</button>
            {/* <button type="reset" class="resetBtnProduct">Reset</button> */}
          {/* </div> */}

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Products added to Bill</span>
          <table class="productsTable">
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