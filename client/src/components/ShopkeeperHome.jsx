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

  const orderTableDiv = useRef();
  const productsDiv = useRef();
  const stocksTable = useRef();
  const [underlineLeft, setUnderlineLeft] = useState('underlined');
  const [underlineRight, setUnderlineRight] = useState('no-underline');
  const [underlineMid, setUnderlineMid] = useState('no-underline');

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

  const handleViewOrders = () => {
    orderTableDiv.current.style.display = 'block';
    productsDiv.current.style.display = 'none';
    stocksTable.current.style.display = 'none';
    setUnderlineLeft('underlined');
    setUnderlineMid('no-underline');
    setUnderlineRight('no-underline');
  };

  const handleViewProducts = () => {
    stocksTable.current.style.display = 'none';
    orderTableDiv.current.style.display = 'none';
    productsDiv.current.style.display = 'flex';
    setUnderlineRight('no-underline');
    setUnderlineMid('underlined');
    setUnderlineLeft('no-underline');
  };

  const handleViewStocks = () => {
    stocksTable.current.style.display = 'block';
    orderTableDiv.current.style.display = 'none';
    productsDiv.current.style.display = 'none';
    setUnderlineRight('underlined');
    setUnderlineMid('no-underline');
    setUnderlineLeft('no-underline');
  };

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

  const fetchOrderData = async (orderNum) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/order/find-shop-order-with-order-number", {
        params: { order_num: orderNum },
        withCredentials: true,
      });
      if (response.status === 200) {
        setOrderDetails((prev) => ({
          ...prev,
          [orderNum]: {
            shop_name: response.data.shop_name,
            datetime: response.data.datetime,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Object.keys(groupedOrders).forEach((customerName) => {
      groupedOrders[customerName].forEach((order) => {
        fetchOrderData(order.order_num);
      });
    });
  }, [groupedOrders]);

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
                <h2>Customer: {customerName}</h2>
                {groupedOrders[customerName].map((order) => {
                  const { order_num } = order;
                  const { shop_name, datetime } = orderDetails[order_num] || {};
                  return (
                    <table className="productsTable" key={order_num}>
                      <caption className="shopNameOnOrder custShopHomeCaption">
                        <i className="zmdi zmdi-shopping-cart"></i> Order Number: {order_num}
                      </caption>
                      {shop_name && (
                        <caption className="shopNameOnOrder">
                          <i className="zmdi zmdi-account"></i> Customer Name: {customerName}
                        </caption>
                      )}
                      {datetime && (
                        <caption className="shopNameOnOrder">
                          <i className="zmdi zmdi-time"></i> Order Time: {datetime}
                        </caption>
                      )}
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
                        {groupedOrders[customerName].map((data, index) => (
                          <tr key={data._id}>
                            <td className="pad-10">{index + 1}</td>
                            <td>{data.prod_name}</td>
                            <td>{data.prod_price}</td>
                            <td>{data.prod_quantity}</td>
                            <td>{data.cpn_code}</td>
                            <td>{data.prod_price * data.prod_quantity}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="4">Total Amount to be paid</td>
                          <td>Coupon Discount</td>
                          <td>
                            {groupedOrders[customerName].reduce((total, order) => total + (order.prod_price * order.prod_quantity), 0)}
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
