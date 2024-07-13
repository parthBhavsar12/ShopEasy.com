import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../css/readOnly.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Bill() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);

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

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [isHidden, setHidden] = useState(true);

  const [formData, setFormData] = useState({
    orderNum: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const { orderNum } = formData;

    if (orderNum === "none") {
      setError('Please select order.');
      return;
    }

    // console.log('Form submitted successfully', formData);

    fetchOrderDataInTable(orderNum);
    setHidden(false);

    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8000/api/v1/bill/add-to-bill",
    //     {
    //       bill_num: billNum,
    //       cust_name: custName,
    //       prod_name: productName,
    //       prod_quantity: productQuant,
    //       prod_discount: productDiscount
    //     },
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     },
    //     { withCredentials: true }
    //   );
    //   // console.log(response)
    //   // console.log(response.status)
    //   if (response.status == 200) {
    //     setMsg('Product added to bill successfully.');
    //   }
    // } catch (error) {
    //   // console.log(error);
    //   // setError('Something gone wrong.');
    //   setError('Some error occured, Try again.');

    // }
  };


  const [orders, setOrders] = useState([]);  
  const [orderData, setOrderData] = useState([]);
  const [custName, setCustName] = useState("");
  const [orderDataInTable, setOrderDataInTable] = useState([]);

  const fetchOrders = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-shop-order-data`,
        {
          params: { shop_id: email },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        // setCustName(response.data.cust_name);
        setOrders(response.data.orderdatas);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrders();
    }
  }, [email]);



  const fetchOrderDataInTable = async (order_no) => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-order-number-data`,
        {
          params: { order_num: order_no },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setOrderDataInTable(response.data.orderdatas);
        // setFormData({
        //   ...formData,
        //   shopName: orderData.shop_name
        // });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrderDataInTable();
    }
  }, [email]);

  const totalDiscount = orderDataInTable.reduce(
    (acc, data) => acc + data.discount,
    0
  );
  const totalPrice = orderDataInTable.reduce(
    (acc, data) => acc + data.prod_price * data.prod_quantity,
    0
  );
  const totalAmount = totalPrice - totalDiscount;

  return (
    <>

      <div className="products make-order-div">
        <span id="productsTitle" className={ isHidden ? "tableContainer" : "isHidden" }>Generate Bill</span>
        {/*  isHidden ? "tableContainer form" : "isHidden" } */}
        <form className="form" onSubmit={handleSubmit} method='post'>

          {/* <span id="productsTitle">Make New Order</span> */}

          <label htmlFor="orderNum">Order Number:</label>
          <select
            name="orderNum"
            id="orderNum"
            value={formData.orderNum}
            onChange={handleInputChange}
            required
            className={(isHidden) ? "" : "read-only-ip"}
            disabled={ !isHidden }
          >
            <option value="none">--Select Order--</option>
            {orders.length > 0
              ? orders.map((order, index) =>
                isFetching ? (
                  <option value="none" key="loading">
                    Loading...
                  </option>
                ) : (
                  <option value={order.order_num} key={index}>
                    {order.order_num} - {order.cust_name} - {order.datetime}
                  </option>
                )
              )
              : ""}
          </select>
          <button type="submit" className={ isHidden ? "btnProduct btn-confirm" : "isHidden" }><i className="zmdi zmdi-forward"></i>Confirm</button>
        </form>

        <div className={ isHidden ? "isHidden" : "tableContainer" }>
          <span id="productsTitle">Order</span>
          <table className="productsTable">
            <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-shopping-cart"></i>Order Number
              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {formData.orderNum}
            </caption>
            {/* <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-account"></i>Customer
              name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{" "}
              {custName}
            </caption>
            <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-time"></i>Order
              Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{" "}
              {orderData.datetime}
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
                {/* <th>Remove</th> */}
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="7" className="no-row loading-data">
                    Loading...
                  </td>
                </tr>
              ) : orderDataInTable.length > 0 ? (
                orderDataInTable.map((data, index) => (
                  <tr key={data._id}>
                    <td className="pad-10">{index + 1}</td>
                    <td>{data.prod_name}</td>
                    <td>{data.prod_price}</td>
                    <td>{data.prod_quantity}</td>
                    <td>{data.cpn_code}</td>
                    <td>{data.discount}</td>
                    <td>{data.prod_price * data.prod_quantity}</td>
                    {/* <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveData(data._id)}
                      >
                        Remove
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-row">
                    No product added.
                  </td>
                </tr>
              )}
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
            {/* <tfoot> */}
            {/* </tfoot> */}
          </table>
            <button className="closeProductsDiv" onClick={() => setHidden(true)}><i className="zmdi zmdi-close"></i> Close</button>
        </div>

      </div>


      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}

    </>
  )
}