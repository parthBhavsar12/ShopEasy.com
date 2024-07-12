import React, { useRef, useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShopkeeperHome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [groupedOrders, setGroupedOrders] = useState({});

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role === "customer") {
          navigate('/customer-home');
        }
      }
    } catch (error) {
      setError('Something went wrong.');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/fetch-products", {
        params: { user_id: email },
        withCredentials: true,
      });
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      setError('Something went wrong.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isFetching]);

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
    }
  }, [email]);

  return (
    <>
      <div className="shop-keeper-home">
        <span id="productsTitle" className="order-title">Your Orders</span>
        {isFetching ? (
          <div className="loading-data">Loading...</div>
        ) : (
          Object.keys(groupedOrders).length === 0 ? (
            <span className="no-order-data">No order found.</span>
          ) : (
            Object.keys(groupedOrders).map((customerName) => (
              <div key={customerName}>
                {groupedOrders[customerName].map((order) => {
                  const { order_num, datetime, prod_name, prod_price, prod_quantity, cpn_code } = order; // Get necessary data
                  return (
                    <table className="productsTable" key={order_num}>
                      <caption className="shopNameOnOrder custShopHomeCaption">
                        <i className="zmdi zmdi-shopping-cart"></i> Order Number: {order_num}
                      </caption>
                      <caption className="shopNameOnOrder">
                        <i className="zmdi zmdi-account"></i> Customer Name: {customerName}
                      </caption>
                      <caption className="shopNameOnOrder">
                        <i className="zmdi zmdi-time"></i> Order Time: {datetime}
                      </caption>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Price per unit</th>
                          <th>Quantity</th>
                          <th>Coupon</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pad-10">1</td>
                          <td>{prod_name}</td>
                          <td>{prod_price}</td>
                          <td>{prod_quantity}</td>
                          <td>{cpn_code}</td>
                          <td>{prod_price * prod_quantity}</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Total Amount to be paid</td>
                          <td>Coupon Discount</td>
                          <td>
                            {prod_price * prod_quantity} {/* Adjust if there's a discount logic */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </div>
            ))
          )
        )}
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  );
}
