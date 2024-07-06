import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../css/remove-btn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MakeOrder() {

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
        if (response.data.user.role == "shopkeeper") {
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

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    shopName: 'none',
    productCat: 'none',
    productName: 'none',
    productPrice: '123',
    productQuant: '',
    applyCoupon: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { shopName, productName } = formData;

    if (shopName === "none" && productName === "none") {
      setError('Please select shop and product.');
      return;
    }

    if (shopName === "none") {
      setError('Please select shop.');
      return;
    }

    if (productName === "none") {
      setError('Please select product.');
      return;
    }

    console.log('Form submitted successfully', formData);
  };

  return (
    <>
      <div className="products">

        <form className="form" onSubmit={handleSubmit} method='post'>

          <span id="productsTitle">Make Order</span>

          <label htmlFor="shopName">Shop Name:</label>
          <select
            name="shopName"
            id="shopName"
            value={formData.shopName}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select shop--</option>
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

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

          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            min="0"
            value={formData.productPrice}
            readOnly
            className="read-only-ip"
          />

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

          <label htmlFor="applyCoupon">Apply Coupon:</label>
          <input
            type="text"
            name="applyCoupon"
            id="applyCoupon"
            value={formData.applyCoupon}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btnProduct">Add to order</button>

        </form>


        <div className="tableContainer">
          <span id="productsTitle">Orders</span>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: ABC store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
              <td><button className="remove-btn remove-all-btn">Clear All</button></td>

            </tr>
          </table>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: PQR store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
              <td><button className="remove-btn remove-all-btn">Clear All</button></td>

            </tr>
          </table>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: XYZ store</caption>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Coupon Discount</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Coupon Discount</td>
              <td>Amount</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount to be paid</td>
              <td>Coupon Discount</td>
              <td>000</td>
              <td><button className="remove-btn remove-all-btn">Clear All</button></td>

            </tr>
          </table>
        </div>

      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  )
}
