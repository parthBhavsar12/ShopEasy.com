import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBox from './MessageBox';
import axios from 'axios';
import '../css/account.css';
import '../css/inputTypeNumber.css';
import capitalize from '../Capitalize';

export default function Account() {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [isDisable, setDisable] = useState(true);
  const [formState, setFormState] = useState('Add');
  const [isFetching, setIsFetching] = useState(false);

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

  const fetchShopkeeperData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/user/is-shopkeeper-data-available`,
        // `http://127.0.0.1:8000/api/v1/user/is-customer-data-available?email=${email}`,
        {
          params: { email },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.user.customer_name);
        const { shop_name, contact, address, local_area, district, pin, state, country } = response.data.user;
        setFormData({
          shop_name: shop_name,
          contact: contact,
          address1: address,
          area: local_area,
          dist: district,
          pin: pin,
          state: state,
          country: country
        });
        setFormState('Edit');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchShopkeeperData();
  }, [isFetching]);

  const handleFormAccess = () => {
    setDisable(!isDisable);
  }

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
          shop_name: capitalize(shop_name),
          contact: contact,
          address: capitalize(address1),
          local_area: capitalize(area),
          district: capitalize(dist),
          pin: pin,
          state: capitalize(state),
          country: capitalize(country)
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
        setDisable(true);
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
        <button className="edit-account" onClick={handleFormAccess}><i className="zmdi zmdi-edit"></i>{formState}</button>

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
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip" : ""}
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
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip" : ""}
            />


            <label htmlFor="address1" className="label-account"><i className="zmdi zmdi-pin"></i>Address</label>

            <textarea
              name="address1"
              id="address1"
              placeholder="1, XYZ Complex"
              value={formData.address1}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip addr-textarea" : "addr-textarea"}
            />
            {/* <input
              type="text"
              name="address1"
              id="address1"
              placeholder="1, XYZ Complex"
              value={formData.address1}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip" : ""}
            /> */}



            <input
              type="text"
              name="area"
              id="area"
              placeholder="Local Area"
              value={formData.area}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip column-right" : "column-right"}
            />



            <input
              type="text"
              name="dist"
              id="dist"
              placeholder="District"
              value={formData.dist}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip column-right" : "column-right"}
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
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip column-right" : "column-right"}
            />



            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip column-right" : "column-right"}
            />



            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
              disabled={isDisable}
              className={(isDisable) ? "read-only-ip column-right" : "column-right"}
            />
          </div>

          <div className="btn">
            <button type="submit" disabled={isDisable} className={(isDisable) ? "disable-btn" : ""}>
              <i className="zmdi zmdi-check-all"></i>Save
            </button>
          </div>
        </form >
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}
    </>
  )
}