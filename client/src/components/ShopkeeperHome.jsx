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


  const [groupedOrders, setGroupedOrders] = useState({});

  const fetchAllShopOrders = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/order/find-all-shop-orders", {
        params: { email: email },
        withCredentials: true,
      });
      if (response.status === 200) {
        const orders = response.data.orderdatas;
        const grouped = orders.reduce((acc, order) => {
          const { order_num } = order;
          if (!acc[order_num]) {
            acc[order_num] = [];
          }
          acc[order_num].push(order);
          return acc;
        }, {});
        setGroupedOrders(grouped);
      }
    } catch (error) {
      setError('Something went wrong.');
    } finally {
      setIsFetching(false);
    }
  };

  // const fetchAllShopOrders = async () => {
  //   setIsFetching(true);
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/v1/order/find-all-shop-orders", {
  //       params: { email: email },
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       const orders = response.data.orderdatas;
  //       const grouped = orders.reduce((acc, order) => {
  //         const { cust_name } = order; // Ensure cust_name is used for grouping
  //         if (!acc[cust_name]) {
  //           acc[cust_name] = [];
  //         }
  //         acc[cust_name].push(order);
  //         return acc;
  //       }, {});
  //       setGroupedOrders(grouped);
  //     }
  //   } catch (error) {
  //     setError('Something went wrong.');
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  // const fetchAllShopOrders = async () => {
  //   setIsFetching(true);
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/v1/order/find-all-shop-orders", {
  //       params: { email: email },
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       const orders = response.data.orderdatas;
  //       const grouped = orders.reduce((acc, order) => {
  //         const { order_num } = order;
  //         if (!acc[order_num]) {
  //           acc[order_num] = [];
  //         }
  //         acc[order_num].push(order);
  //         return acc;
  //       }, {});
  //       setGroupedOrders(grouped);
  //     }
  //   } catch (error) {
  //     setError('Something went wrong.');
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };
  

  const fetchShopOrders = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/order/find-shop-order", {
        params: { shop_id: email },
        withCredentials: true,
      });
      if (response.status === 200) {
        const orders = response.data.orderdatas;
        const grouped = orders.reduce((acc, order) => {
          const { cust_name } = order;
          if (!acc[cust_name]) {
            acc[cust_name] = [];
          }
          acc[cust_name].push(order);
          return acc;
        }, {});
        setGroupedOrders(grouped);
      }
    } catch (error) {
      setError('Something went wrong.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchShopOrders();
      fetchAllShopOrders();
    }
  }, [email]);

  return (
    <>
      <div className="shop-keeper-home">
        <div className="shopKeeperHomeBtns">
          <input type="button" id="btnYourOrders" value="Your Orders" className={underlineLeft} onClick={handleViewOrders} />
          <input type="button" id="btnYourProducts" value="Your Products" className={underlineMid} onClick={handleViewProducts} />
          <input type="button" id="btnCheckStocks" value="Check Stocks" className={underlineRight} onClick={handleViewStocks} />
        </div>
        <div ref={orderTableDiv} className='orderTableDiv'>
          {Object.keys(groupedOrders).map((order_num) => {
            const orderDetails = groupedOrders[order_num];
            // const customerId = orderDetails[0].cust_name;
            const customerId = orderDetails[0].cust_id;
            // const orderTime = orderDetails[0].datetime;
            const totalPrice = orderDetails.reduce((acc, order) => acc + (order.prod_price * order.prod_quantity), 0);
            const totalDiscount = orderDetails.reduce((acc, order) => acc + order.discount, 0);
            const totalAmount = totalPrice - totalDiscount;
  
            return (
              <table key={order_num} className="productsTable shopkeeperHomeOrderTable">
                <caption className="shopNameOnOrder custShopHomeCaption">
                  <i className="zmdi zmdi-shopping-cart"></i> Order Number: {order_num}
                </caption>
                <caption className="shopNameOnOrder">
                  <i className="zmdi zmdi-account"></i> Customer Id: {customerId}
                </caption>
                {/* <caption className="shopNameOnOrder">
                  <i className="zmdi zmdi-time"></i> Order Time: {orderTime}
                </caption> */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price per unit</th>
                    <th>Quantity</th>
                    <th>Coupon</th>
                    <th>Discount</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((order, index) => (
                    <tr key={order._id}>
                      <td className="pad-10">{index + 1}</td>
                      <td>{order.prod_name}</td>
                      <td>{order.prod_price}</td>
                      <td>{order.prod_quantity}</td>
                      <td>{order.cpn_code}</td>
                      <td>{order.discount}</td>
                      <td>{order.prod_price * order.prod_quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="7">
                      <strong>Total Price:</strong> {totalPrice.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="7">
                      <strong>Total Discount:</strong> {totalDiscount.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="7">
                      <strong>Total Amount to be Paid:</strong> {totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
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
                  <span>Rs. {product.prod_price}</span>
                </div>
              </div>
            ))
          ) : (
            <span className="no-product">No product found. Please <Link to="/products" className="a-href">Add your products</Link> if you are here for the first time.</span>
          )}
        </div>
        <div ref={stocksTable} className='stocksTable'>
          <table className="productsTable">
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
  );

  // return (
  //   <>
  //     <div className="shop-keeper-home">
  //       {/* <span id="productsTitle" className="order-title">Your Orders</span> */}
  //       <div className="shopKeeperHomeBtns">
  //         <input type="button" id="btnYourOrders" value="Your Orders" className={underlineLeft} onClick={handleViewOrders} />
  //         <input type="button" id="btnYourProducts" value="Your Products" className={underlineMid} onClick={handleViewProducts} />
  //         <input type="button" id="btnCheckStocks" value="Check Stocks" className={underlineRight} onClick={handleViewStocks} />
  //       </div>
  //       <div ref={orderTableDiv} className='orderTableDiv'>
  //         <table className="productsTable shopkeeperHomeOrderTable">
  //           <caption className="shopNameOnOrder custShopHomeCaption">
  //             <i className="zmdi zmdi-shopping-cart"></i> Order Number: order_num
  //           </caption>
  //           <caption className="shopNameOnOrder">
  //             <i className="zmdi zmdi-account"></i> Customer Name: customerId
  //           </caption>
  //           <caption className="shopNameOnOrder">
  //             <i className="zmdi zmdi-time"></i> Order Time: datetime
  //           </caption>
  //           <thead>
  //             <tr>
  //               <th>#</th>
  //               <th>Name</th>
  //               <th>Price per unit</th>
  //               <th>Quantity</th>
  //               <th>Coupon</th>
  //               <th>Discount</th>
  //               <th>Amount</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td className="pad-10">1</td>
  //               <td>prod_name</td>
  //               <td>prod_price</td>
  //               <td>prod_quantity</td>
  //               <td>cpn_code</td>
  //               <td>discount</td>
  //               <td>prod_price * prod_quantity</td>
  //             </tr>
  //             <tr>
  //               <td colSpan="8">
  //                 <strong>Total Price:</strong> totalPrice.toFixed(2)
  //               </td>
  //             </tr>
  //             <tr>
  //               <td colSpan="8">
  //                 <strong>Total Discount:</strong> totalDiscount.toFixed(2)
  //               </td>
  //             </tr>
  //             <tr>
  //               <td colSpan="8">
  //                 <strong>Total Amount to be Paid:</strong> totalAmount.toFixed(2)
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>

  //       </div>
  //       <div ref={productsDiv} className='productsDiv'>
  //         {products.length > 0 ? (
  //           products.map((product) => (
  //             <div className="product-card" key={product._id}>
  //               <img src="../../logo/new_product.png" alt="Product" />
  //               <div className="product-details">
  //                 <span className="product"><i className="zmdi zmdi-mall"></i>Name: </span>
  //                 <span>{product.prod_name}</span>
  //                 <span className="product"><i className="zmdi zmdi-ticket-star"></i>Category: </span>
  //                 <span>{product.prod_category}</span>
  //                 <span className="product"><i>&#8377;</i>Price:</span>
  //                 <span >Rs. {product.prod_price}</span>
  //               </div>
  //             </div>
  //           ))
  //         ) : (
  //           <span className="no-product">No product found. Please <Link to="/products" className="a-href">Add your products</Link> if you are here for the first time.</span>
  //         )}
  //       </div>
  //       <div ref={stocksTable} className='stocksTable'>
  //         <table className="productsTable" >
  //           <caption id="stocksTableCaption">(Less to More)<i className="zmdi zmdi-long-arrow-down"></i></caption>
  //           <thead>
  //             <tr>
  //               <th>#</th>
  //               <th>Product Name</th>
  //               <th>Remaining Stock (Quantity)</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {products.length > 0 ? (
  //               products
  //                 .sort((a, b) => a.prod_quantity - b.prod_quantity)
  //                 .map((product, index) => (

  //                   <tr key={index}>
  //                     <td>{index + 1}</td>
  //                     <td>{product.prod_name}</td>
  //                     <td>{product.prod_quantity}</td>
  //                   </tr>

  //                 ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="3" className="no-product-td">
  //                   No product found. Please <Link to="/products" className="a-href">Add your products</Link> if you are here for the first time.
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //     {error && <MessageBox msgTitle="Error" msgText={error} />}
  //   </>
  // )
}