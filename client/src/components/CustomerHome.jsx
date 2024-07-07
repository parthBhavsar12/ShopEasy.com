import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerHome() {

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

  return (
    <>
      <div className="shop-keeper-home">
        <span id="productsTitle" className="order-title">Your Orders</span>
        <table className="productsTable">
          <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: ABC Store <button className="order-action">Complete Order</button></caption>
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
        <table className="productsTable">
          <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: PQR Store <button className="order-action">Complete Order</button></caption>
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
        <table className="productsTable">
          <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name: XYZ Store <button className="order-action">Complete Order</button></caption>
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
    </>
  )
}
