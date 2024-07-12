import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerHome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [custOrders, setCustOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [orderDetails, setOrderDetails] = useState({}); // To store shop_name and datetime for orders

  const checkUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/me",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role === "shopkeeper") {
          navigate('/shopkeeper-home');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const fetchCustomerOrders = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-all-customer-order-data`,
        {
          params: { cust_id: email },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const orders = response.data.orderdatas;
        setCustOrders(orders);
        const grouped = orders.reduce((acc, order) => {
          (acc[order.order_num] = acc[order.order_num] || []).push(order);
          return acc;
        }, {});
        setGroupedOrders(grouped);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  const fetchOrderData = async (orderNum) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-order`,
        {
          params: { order_num: orderNum },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Store shop_name and datetime by order_num
        setOrderDetails(prev => ({
          ...prev,
          [orderNum]: {
            shop_name: response.data.shop_name,
            datetime: response.data.datetime,
          }
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (email) {
      fetchCustomerOrders();
    }
  }, [email]);

  useEffect(() => {
    // Fetch order details for each order number
    Object.keys(groupedOrders).forEach(orderNum => {
      fetchOrderData(orderNum);
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
            <div>No orders found.</div>
          ) : (
            Object.keys(groupedOrders).map((orderNum) => {
              const { shop_name, datetime } = orderDetails[orderNum] || {};

              return (
                <table className="productsTable" key={orderNum}>
                  <caption className="shopNameOnOrder custShopHomeCaption">
                    <i className="zmdi zmdi-shopping-cart"></i>
                    Order Number: {orderNum}
                  </caption>
                  {shop_name && (
                    <caption className="shopNameOnOrder">
                      <i className="zmdi zmdi-store"></i>
                      Shop Name: {shop_name}
                    </caption>
                  )}
                  {datetime && (
                    <caption className="shopNameOnOrder">
                      <i className="zmdi zmdi-time"></i>
                      Order Time: {datetime}
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
                    {groupedOrders[orderNum].length > 0 ? (
                      groupedOrders[orderNum].map((data, index) => (
                        <tr key={data._id}>
                          <td className="pad-10">{index + 1}</td>
                          <td>{data.prod_name}</td>
                          <td>{data.prod_price}</td>
                          <td>{data.prod_quantity}</td>
                          <td>{data.cpn_code}</td>
                          <td>{data.prod_price * data.prod_quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-row">No products found for this order.</td>
                      </tr>
                    )}
                    {/* Calculate Total Amount */}
                    {groupedOrders[orderNum].length > 0 && (
                      <tr>
                        <td colSpan="4">Total Amount to be paid</td>
                        <td>Coupon Discount</td>
                        <td>
                          {groupedOrders[orderNum].reduce((total, order) => total + (order.prod_price * order.prod_quantity), 0)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              );
            })
          )
        )}
      </div>
    </>
  );
}