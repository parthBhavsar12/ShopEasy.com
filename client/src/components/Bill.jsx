import React, { useState } from 'react';
import MessageBox from './MessageBox';

export default function Bill() {

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    custName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { productName } = formData;

    if (productName === "none") {
      setError('Please select product.');
      return;
    }

    console.log('Form submitted successfully', formData);
  };

  return (
    <>

      <div className="products" id="updateProducts">

        <form className="form" onSubmit={handleSubmit} method='post'>
          <span id="productsTitle">Generate Bill</span>

          <label htmlFor="custName">Customer Name:</label>
          <input
            type="text"
            name="custName"
            id="custName"
            value={formData.custName}
            onChange={handleInputChange}
            required
          />

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
          <button type="submit" class="btnProduct">Add to Bill</button>
          {/* <button type="reset" class="resetBtnProduct">Reset</button> */}
          {/* </div> */}

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Products added to Bill</span>
          <table class="productsTable">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>

            <tr>
              <td colSpan="4">Total Price Amount:</td>
              <td>Price</td>
            </tr>
          </table>
        </div>

      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}

    </>
  )
}