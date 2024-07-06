import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Coupons() {

  const [minDateTime, setMinDateTime] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDateTime(formattedDateTime);
  }, []);

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
        setEmail(response.data.user.email);
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

    // console.log('Form submitted successfully', formData);

    // cpnStartDate = cpnStartDate.replace('T', ' ');
    // cpnEndDate = cpnEndDate.replace('T', ' ');
    // setMsg(printMsg);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/coupon/add-coupon",
        {
          user_id: email,
          cpn_code: cpnCode.toUpperCase(),
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
            placeholder="Add Coupon Code"
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
            placeholder="Add Quantity of Coupon"
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
            min={minDateTime}
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
