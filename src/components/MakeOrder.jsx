import React from 'react'

export default function MakeOrder() {
  return (
    <>
      <div className="products">

        <form className="form">

            <span id="productsTitle">Make Order</span>
          
            <label htmlFor="shopName">Shop Name:</label>
            <select name="shopName" id="shopName">
              <option value="NA">NA</option>
              <option value="abc">abc</option>
              <option value="xyz">xyz</option>
            </select>
          
            <label htmlFor="productName">Product Name:</label>
            <select name="productName" id="productName">
              <option value="NA">NA</option>
              <option value="abc">abc</option>
              <option value="xyz">xyz</option>
            </select>
          
            <label htmlFor="productQuant">Product Quantity:</label>
            <input type="number" name="productQuant" id="productQuant" min="0"/>

            <label htmlFor="applyCoupon">Apply Coupon:</label>
            <input type="text" name="applyCoupon" id="applyCoupon"/>

            <button type="submit" class="btnProduct">Add to order</button>

        </form>


        <div className="tableContainer">
          <span id="productsTitle">Ordered Products</span>
          <table class="productsTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-store"></i>Shop name: ABC store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
            </tr>
          </table>
          <table class="productsTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-store"></i>Shop name: PQR store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
            </tr>
          </table>
          <table class="productsTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-store"></i>Shop name: XYZ store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
            </tr>
          </table>
        </div>

      </div>
    </>
  )
}
