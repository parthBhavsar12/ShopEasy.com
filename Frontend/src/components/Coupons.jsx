import React, { useState } from 'react';
import MessageBox from './MessageBox';

export default function Coupons() {

  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    cpnCode: '',
    cpnQuant: '',
    cpnStartDate: '',
    cpnEndDate: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('');
    
    const { cpnCode, cpnQuant, cpnStartDate, cpnEndDate } = formData;
    const printMsg = `Coupun added successfully. Code: ${cpnCode}, Quantity: ${cpnQuant}, Time Duration: ${cpnStartDate} - ${cpnEndDate}`

    console.log('Form submitted successfully', formData);
    setMsg(printMsg);
  };

  return (
    <>

      <div className="products" id="updateProducts">

        <form className="form" onSubmit={handleSubmit} method='post'>
          <span id="productsTitle">Add Coupon</span>

          <label htmlFor="cpnCode">Coupon code:</label>
          <input
            type="text"
            name="cpnCode"
            id="cpnCode"
            value={formData.cpnCode}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="cpnQuant">Coupon Quantity:</label>
          <input
            type="number"
            name="cpnQuant"
            id="cpnQuant"
            min="0"
            value={formData.cpnQuant}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="cpnStartDate">Start Date-Time:</label>
          <input
            type="datetime-local"
            name="cpnStartDate"
            id="cpnStartDate"
            value={formData.cpnStartDate}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="cpnEndDate">End Date-Time:</label>
          <input
            type="datetime-local"
            name="cpnEndDate"
            id="cpnEndDate"
            value={formData.cpnEndDate}
            onChange={handleInputChange}
            required
          />

          <button type="submit" class="btnProduct">Add Coupon</button>

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Coupons</span>
          <table class="productsTable">
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Quantity</th>
              <th>Start Date-Time</th>
              <th>End Date-Time</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
            </tr>
          </table>
        </div>

      </div>
      
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}

    </>
  )
}
