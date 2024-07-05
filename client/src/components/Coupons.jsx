import React, { useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';

export default function Coupons() {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    cpnCode: '',
    cpnQuant: '',
    cpnDiscount: '0',
    cpnStartDate: '',
    cpnEndDate: ''
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

    const { cpnCode, cpnQuant, cpnDiscount, cpnStartDate, cpnEndDate } = formData;
    // let { cpnStartDate, cpnEndDate } = formData;
    // const printMsg = `Coupun added successfully. Code: ${cpnCode}, Quantity: ${cpnQuant}, Discount (%): ${cpnDiscount}, Time Duration: ${cpnStartDate} - ${cpnEndDate}`

    console.log('Form submitted successfully', formData);

    // cpnStartDate = cpnStartDate.replace('T', ' ');
    // cpnEndDate = cpnEndDate.replace('T', ' ');
    // setMsg(printMsg);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/coupon/add-coupon",
        {
          cpn_code: cpnCode,
          cpn_quantity: cpnQuant,
          cpn_discount: cpnDiscount,
          start_datetime: new Date(cpnStartDate).toISOString(),
          end_datetime: new Date(cpnEndDate).toISOString()
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
        setMsg('Coupon added successfully.');
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

          <label htmlFor="cpnDiscount">Discount (%):</label>
          <input
            type="number"
            name="cpnDiscount"
            id="cpnDiscount"
            min="0"
            value={formData.cpnDiscount}
            onChange={handleInputChange}
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

          <button type="submit" className="btnProduct">Add Coupon</button>

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Coupons</span>
          <table className="productsTable">
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Quantity</th>
              <th>Discount (%)</th>
              <th>Start Date-Time</th>
              <th>End Date-Time</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Coupon Code</td>
              <td>Quantity</td>
              <td>Discount</td>
              <td>Start Date-Time</td>
              <td>End Date-Time</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
          </table>
        </div>

      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}

    </>
  )
}
