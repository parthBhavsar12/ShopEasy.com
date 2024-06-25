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
    productsDiv.current.style.display = 'block';
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
        {/* <span id="itemsTitle" className="order-title">Your Orders</span> */}
        <div className="shopKeeperHomeBtns">
          <input type="button" id="btnYourOrders" value="Your Orders" className={underlineLeft} onClick={handleViewOrders} />
          <input type="button" id="btnYourProducts" value="Your Products" className={underlineMid} onClick={handleViewProducts} />
          <input type="button" id="btnCheckStocks" value="Check Stocks" className={underlineRight} onClick={handleViewStocks} />
        </div>
        <div ref={orderTableDiv} className='orderTableDiv'>
          <table class="itemsTable shopkeeperHomeOrderTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-account"></i>Customer name: ABC XYZ<button className="order-action">Complete Order</button></caption>

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
          <table class="itemsTable shopkeeperHomeOrderTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-account"></i>Customer name: ABC PQR<button className="order-action">Complete Order</button></caption>

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
          <table class="itemsTable shopkeeperHomeOrderTable">
            <caption class="shopNameOnOrder"><i class="zmdi zmdi-account"></i>Customer name: PQR XYZ<button className="order-action">Complete Order</button></caption>

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
          <div className="shop-container">
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
            <div className="shop-item">
              <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
              <span>ABC store</span>
              <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
              <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
              <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
              <span>0123456789</span>
            </div>
          </div>
        </div>
        <div ref={stocksTable} className='stocksTable'>
          <table class="itemsTable" >
            {/* <caption class="shopNameOnOrder"><i class="zmdi zmdi-account"></i>Customer name: PQR XYZ<button className="order-action">Complete Order</button></caption> */}

            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Remaining Stock</th>
              <th>Minimum Stock</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Item Name</td>
              <td>Remaining Stock</td>
              <td>Minimum Stock</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}