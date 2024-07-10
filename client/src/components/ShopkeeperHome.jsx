import React, { useRef, useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ShopkeeperHome() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const checkUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/me",
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role == "customer") {
          navigate('/customer-home');
        }
      }
    } catch (error) {
      // console.log(error);
      setError('Something gone wrong.');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

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

  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const fetchProducts = async () => {
    setIsFetching(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/fetch-products",
        {
          params: { user_id: email },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts(response.data.products);
        const categories = response.data.products.map(product => product.prod_category);
        const uniqueCategoriesSet = new Set(categories);
        setUniqueCategories(Array.from(uniqueCategoriesSet));
      }
    } catch (error) {
      // console.log(error);
      setError('Something gone wrong.');
    }
    finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isFetching]);

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
            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Coupon Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          <table className="productsTable shopkeeperHomeOrderTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-account"></i>Customer name: ABC PQR<button className="order-action">Complete Order</button></caption>
            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Coupon Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          <table className="productsTable shopkeeperHomeOrderTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-account"></i>Customer name: PQR XYZ<button className="order-action">Complete Order</button></caption>
            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Coupon Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
        <div ref={productsDiv} className='productsDiv'>
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src="../../logo/new_product.png" alt="Product" />
                <div className="product-details">
                  <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
                  <span>{product.prod_name}</span>
                  <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
                  <span>{product.prod_category}</span>
                  <span className="product"><i>&#8377;</i>Price:</span>
                  <span >Rs. {product.prod_price}</span>
                </div>
              </div>
            ))
          ) : (
            <span className="no-product">No product found. Please <Link to="/products" className="a-href">Add your products</Link> if you are here for the first time.</span>
          )}
        </div>
        <div ref={stocksTable} className='stocksTable'>
          <table className="productsTable" >
            <caption id="stocksTableCaption">(Less to More)<i className="zmdi zmdi-long-arrow-down"></i></caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Remaining Stock (Quantity)</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products
                  .sort((a, b) => a.prod_quantity - b.prod_quantity)
                  .map((product, index) => (

                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.prod_name}</td>
                      <td>{product.prod_quantity}</td>
                    </tr>

                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-product-td">
                    No product found. Please <Link to="/products" className="a-href">Add your products</Link> if you are here for the first time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  )
}