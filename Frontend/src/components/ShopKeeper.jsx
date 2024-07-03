import React, { useState } from 'react';
import MessageBox from './MessageBox';
import '../css/account.css';
import '../css/inputTypeNumber.css';

export default function Account() {

  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { contact, pin } = formData;

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

    console.log('Form submitted successfully', formData);
  };

  return (
    <>
      <form className='account-form' onSubmit={handleSubmit} method='post'>
        <div className="divUser">
          <label className='signUpUser'>Shopkeeper: abc@xyz.pqr</label>
        </div>

        <div><label htmlFor="shop_name" className="label-account"><i className="zmdi zmdi-shopping-cart"></i>Shop Name</label></div>
        <div>
          <input
            type="text"
            name="shop_name"
            id="shop_name"
            placeholder="ABC Stores"
            value={formData.shop_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div><label htmlFor="contact" className="label-account"><i className="zmdi zmdi-phone"></i>Contact</label></div>
        <div>
          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="0000000000"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </div>

        <div><label htmlFor="address1" className="label-account"><i className="zmdi zmdi-pin"></i>Address</label></div>
        <div>
          <input
            type="text"
            name="address1"
            id="address1"
            placeholder="1, XYZ Complex"
            value={formData.address1}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="area"
            id="area"
            placeholder="Local Area"
            value={formData.area}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="dist"
            id="dist"
            placeholder="District"
            value={formData.dist}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            type="number"
            name="pin"
            id="pin"
            placeholder="Pin Code"
            value={formData.pin}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="btn"><button type="submit"><i className="zmdi zmdi-check-all"></i>Save</button></div>

      </form>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
    </>
  )
}