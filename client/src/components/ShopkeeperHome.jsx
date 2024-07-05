import React, { useRef, useState } from 'react';

export default function ShopkeeperHome() {
  const orderTableDiv = useRef();
  const productsDiv = useRef();
  const stocksTable = useRef();
  const [underlineLeft, setUnderlineLeft] = useState('underlined');
  const [underlineRight, setUnderlineRight] = useState('no-underline');
  const [underlineMid, setUnderlineMid] = useState('no-underline');
  const handleViewOrders = () => {
    orderTableDiv.current.style.display = 'block';
    productsDiv.current.style.display = 'none';
    stocksTable.current.style.display = 'none';
    setUnderlineLeft('underlined');
    setUnderlineMid('no-underline');
    setUnderlineRight('no-underline');
  }
  const handleViewProducts = () => {
    stocksTable.current.style.display = 'none';
    orderTableDiv.current.style.display = 'none';
    productsDiv.current.style.display = 'flex';
    setUnderlineRight('no-underline');
    setUnderlineMid('underlined');
    setUnderlineLeft('no-underline');
  }
  const handleViewStocks = () => {
    stocksTable.current.style.display = 'block';
    orderTableDiv.current.style.display = 'none';
    productsDiv.current.style.display = 'none';
    setUnderlineRight('underlined');
    setUnderlineMid('no-underline');
    setUnderlineLeft('no-underline');
  }
  return (
    <>
      <div className="shop-keeper-home">
        {/* <span id="productsTitle" className="order-title">Your Orders</span> */}
        <div className="shopKeeperHomeBtns">
          <input type="button" id="btnYourOrders" value="Your Orders" className={underlineLeft} onClick={handleViewOrders} />
          <input type="button" id="btnYourProducts" value="Your Products" className={underlineMid} onClick={handleViewProducts} />
          <input type="button" id="btnCheckStocks" value="Check Stocks" className={underlineRight} onClick={handleViewStocks} />
        </div>
        <div ref={orderTableDiv} className='orderTableDiv'>
          <table className="productsTable shopkeeperHomeOrderTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-account"></i>Customer name: ABC XYZ<button className="order-action">Complete Order</button></caption>

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
          <table className="productsTable shopkeeperHomeOrderTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-account"></i>Customer name: ABC PQR<button className="order-action">Complete Order</button></caption>

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
          <table className="productsTable shopkeeperHomeOrderTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-account"></i>Customer name: PQR XYZ<button className="order-action">Complete Order</button></caption>

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
        <div ref={productsDiv} className='productsDiv'>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
          <div className="product-card">
            <img src="../../logo/new_product.png" alt="Product" />
            <div className="product-details">
              <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
              <span>ABC XYZ</span>
              <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
              <span>pqr</span>
              <span className="product"><i>&#8377;</i>Price:</span>
              <span >Rs. 000</span>
            </div>
          </div>
        </div>
        <div ref={stocksTable} className='stocksTable'>
          <table className="productsTable" >
            <caption id="stocksTableCaption">(Less to More)<i className="zmdi zmdi-long-arrow-down"></i></caption>

            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Remaining Stock</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
            <tr>
              <td>#</td>
              <td>Product Name</td>
              <td>Remaining Stock</td>

            </tr>
          </table>
        </div>
      </div>
    </>
  )
}