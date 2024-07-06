import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from './MessageBox';
import axios from 'axios';
import '../css/account.css';
import '../css/inputTypeNumber.css';

export default function Account() {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shop_name: '',
    contact: '',
    address1: '',
    area: '',
    dist: '',
    pin: '',
    state: '',
    country: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          navigate('/customer-account');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const { shop_name, contact, address1, area, dist, pin, state, country } = formData;

    if (contact.length < 8 && pin.length < 6) {
      setError('Please enter appropriate Contact number and Pin code.');
      return;
    }

    if (contact.length < 8) {
      setError('Please enter appropriate Contact number.');
      return;
    }

    if (pin.length < 6) {
      setError('Please enter appropriate Pin code.');
      return;
    }

    // console.log('Form submitted successfully', formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/user/shopkeeper-data",
        {
          email: email,
          shop_name: shop_name,
          contact: contact,
          address: address1,
          local_area: area,
          district: dist,
          pin: pin,
          state: state,
          country: country
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
        setMsg('Data added/updated successfully.');
      }
    } catch (error) {
      console.log(error);
      setError('Some error occured, Try again.');
    }

  };

  return (
    <>
      <div className="account-user">
        <i className="zmdi zmdi-account-circle user-icon"></i>
        <span className="user-email-id">{email}</span>
        <button className="edit-account"><i className="zmdi zmdi-edit"></i>Edit</button>

        <form className='account-form' onSubmit={handleSubmit} method='post'>
          <div className="user-data">
            <label htmlFor="shop_name" className="label-account"><i className="zmdi zmdi-shopping-cart"></i>Shop Name</label>

            <input
              type="text"
              name="shop_name"
              id="shop_name"
              placeholder="ABC Stores"
              value={formData.shop_name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="contact" className="label-account"><i className="zmdi zmdi-phone"></i>Contact</label>

            <input
              type="number"
              name="contact"
              id="contact"
              min='0'
              placeholder="0000000000"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />


            <label htmlFor="address1" className="label-account"><i className="zmdi zmdi-pin"></i>Address</label>

            <input
              type="text"
              name="address1"
              id="address1"
              placeholder="1, XYZ Complex"
              value={formData.address1}
              onChange={handleInputChange}
              required
            />



            <input
              type="text"
              name="area"
              id="area"
              placeholder="Local Area"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="column-right"
            />



            <input
              type="text"
              name="dist"
              id="dist"
              placeholder="District"
              value={formData.dist}
              onChange={handleInputChange}
              required
              className="column-right"
            />



            <input
              type="number"
              name="pin"
              id="pin"
              min='0'
              placeholder="Pin Code"
              value={formData.pin}
              onChange={handleInputChange}
              required
              className="column-right"
            />



            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="column-right"
            />



            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="column-right"
            />
          </div>

          <div className="btn"><button type="submit"><i className="zmdi zmdi-check-all"></i>Save</button></div>
        </form >
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}
    </>
  )
}