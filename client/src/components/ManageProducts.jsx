import React, { useRef, useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/insert_category.css';
import capitalize from '../Capitalize';

export default function ManageProducts() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

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

  const addProductsForm = useRef();
  const updateProductsForm = useRef();

  const moveToUpdateProducts = () => {
    addProductsForm.current.style.display = 'none';
    updateProductsForm.current.style.display = 'grid';
    setFormData({
      ...formData,
      productName: 'none'
    });
  }

  const moveToAddProducts = () => {
    updateProductsForm.current.style.display = 'none';
    addProductsForm.current.style.display = 'grid';
    setFormData({
      ...formData,
      productName: ''
    });
  }

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [insertProductCategory, setInsertProductCategory] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    productCat: 'none',
    productPrice: '',
    productQuant: '',
    productImg: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsertCategory = (e) => {
    setInsertProductCategory(e.target.value);
  };

  const addCategory = () => {
    console.log(insertProductCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    const { productName, productCat, productPrice, productQuant, productImg } = formData;

    if (productName === "none" && productCat === "none") {
      setError('Please select product and product category.');
      return;
    }

    if (productName === "none") {
      setError('Please select product.');
      return;
    }

    if (productCat === "none") {
      setError('Please select product category.');
      return;
    }

    // console.log('Form submitted successfully', formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/product/add-product",
        {
          user_id: email,
          prod_name: capitalize(productName),
          prod_category: capitalize(productCat),
          prod_price: productPrice,
          prod_quantity: productQuant,
          prod_image: productImg
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        setMsg('Product added successfully.');
      }
    } catch (error) {
      // console.log(error);
      setError('Some error occured, Try again.');

    }

  };

  return (
    <>
      <div className="products" id="addProducts">

        <form className="form" ref={addProductsForm} onSubmit={handleSubmit} method='post'>

          <div className="buttonMerger">
            <input type="button" id="actionProductsLeft" value="Add Products" className="green underline" />
            <input type="button" id="actionProductsRight" value="Update Products" className="red" onClick={moveToUpdateProducts} />
          </div>


          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Add Name of Product"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productCat">Product Category:</label>
          <div className="product-category-div">
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
            <input
              type="text"
              name="productCat"
              id="productCat"
              placeholder="Add New Category"
              value={(formData.productCat=="none")?"":formData.productCat}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            placeholder="Add Price of Product"
            min="0"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productQuant">Product Quantity:</label>
          <input
            type="number"
            name="productQuant"
            id="productQuant"
            placeholder="Add Quantity"
            min="0"
            value={formData.productQuant}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productImg">Product Image:</label>
          <input
            type="file"
            name="productImg"
            id="productImg"
            accept='.jpg,.jpeg,.png'
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btnProduct">Add Product</button>

        </form>

        <form className="form" ref={updateProductsForm} id="updateProductsForm" onSubmit={handleSubmit} method='post'>

          <div className="buttonMerger">
            <input type="button" id="actionProductsLeft" value="Add Products" className="red" onClick={moveToAddProducts} />
            <input type="button" id="actionProductsRight" value="Update Products" className="green underline" />
          </div>

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

          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            placeholder="Update Price of Product"
            min="0"
            value={formData.productPrice}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productQuant">Product Quantity:</label>
          <input
            type="number"
            name="productQuant"
            id="productQuant"
            placeholder="Update Quantity of Product"
            min="0"
            value={formData.productQuant}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="productImg">Product Image:</label>
          <input
            type="file"
            name="productImg"
            id="productImg"
            accept='.jpg,.jpeg,.png'
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btnProduct">Update Product</button>

        </form>

        <div className="tableContainer">
          <span id="productsTitle">Products</span>
          <table className="productsTable">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
              <td><button className="remove-btn">Remove</button></td>
            </tr>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Quantity</td>
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