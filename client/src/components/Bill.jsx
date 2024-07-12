import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../css/readOnly.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Bill() {

  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    billNum: 123,
    custName: '',
    productCat: 'none',
    productName: 'none',
    productQuant: '',
    productDiscount: '0'
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

    console.log('Form submitted successfully', formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/bill/add-to-bill",
        {
          bill_num: billNum,
          cust_name: custName,
          prod_name: productName,
          prod_quantity: productQuant,
          prod_discount: productDiscount
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );
      // console.log(response)
      // console.log(response.status)
      if (response.status == 200) {
        setMsg('Product added to bill successfully.');
      }
    } catch (error) {
      // console.log(error);
      // setError('Something gone wrong.');
      setError('Some error occured, Try again.');

    }
  };

  return (
    <>

      <div className="products make-order-div">
      <span id="productsTitle">Generate Bill</span>
        <form className="form" onSubmit={handleSubmit} method='post'>

          {/* <span id="productsTitle">Make New Order</span> */}

          <label htmlFor="shopName">Order Number:</label>
          <select
            name="shopName"
            id="shopName"
            value={formData.shopName}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select order--</option>
            <option value="none">--Select order--</option>
            <option value="none">--Select order--</option>
            {/* {
            distShops.length > 0 ? (
              distShops.map((shop, index) => (
                isFetching ? (
                  <option value="none" key={index}>Loading...</option>
                ) : (
                  <option value={shop.shop_name} key={shop.shop_name}>{shop.shop_name}</option>
                )
              ))
            ) : (
              ''
            ) */}
          {/* } */}

          </select>
          <button type="submit" className="btnProduct btn-confirm"><i className="zmdi zmdi-forward"></i>Confirm</button>
        </form>
      </div>


      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}

    </>
  )
}