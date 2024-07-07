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
      console.log(error);
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

    const { billNum, custName, productName, productQuant, productDiscount } = formData;

    if (productName === "none") {
      setError('Please select product.');
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
      console.log(error);
      setError('Some error occured, Try again.');

    }
  };

  return (
    <>

      <div className="products" id="updateProducts">

        <form className="form" onSubmit={handleSubmit} method='post'>
          <span id="productsTitle">Generate Bill</span>

          <label htmlFor="billNum">Bill No.:</label>
          <input
            type="number"
            name="billNum"
            id="billNum"
            value={formData.billNum}
            readOnly
            className="read-only-ip"
          />

          <label htmlFor="custName">Customer Name:</label>
          <input
            type="text"
            name="custName"
            id="custName"
            value={formData.custName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productCat">Product Category:</label>
          <select
            name="productCat"
            id="productCat"
            value={formData.productCat}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select category--</option>
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          <label htmlFor="productName">Product Name:</label>
          <select
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select product--</option>
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          <label htmlFor="productQuant">Product Quantity:</label>
          <input
            type="number"
            name="productQuant"
            id="productQuant"
            min="0"
            value={formData.productQuant}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productDiscount">Discount (%):</label>
          <input
            type="number"
            name="productDiscount"
            id="productDiscount"
            min="0"
            value={formData.productDiscount}
            onChange={handleInputChange}
          />

          {/* <div className="buttonMerger"> */}
          <button type="submit" className="btnProduct">Add to Bill</button>
          {/* <button type="reset" className="resetBtnProduct">Reset</button> */}
          {/* </div> */}

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Products added to Bill</span>
          <table className="productsTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Discount</td>
                <td><button className="remove-btn">Remove</button></td>
              </tr>

              <tr>
                <td colSpan="3">Total Price Amount:</td>
                <td colSpan="2">Price</td>
                <td><button className="remove-btn remove-all-btn">Clear All</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}

    </>
  )
}