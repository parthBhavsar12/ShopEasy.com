import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../css/remove-btn.css';
import '../css/add_order.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddOrder() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [msg, setMsg] = useState('');
  // shopName: 'none',
  const [formData, setFormData] = useState({
    orderNum: localStorage.getItem("order_num"),
    productCat: 'none',
    productName: 'none',
    productPrice: '111',
    productQuant: '',
    applyCoupon: '-',
  });

  const [orderData, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderDataInTable, setOrderDataInTable] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [shopName, setShopName] = useState('');

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
    fetchProducts();
  }, []);

  const fetchOrderData = async (orderNum) => {

    // console.log("Email: ", email);
    // console.log("cust_name: ", custName);
    // console.log("shop_name: ", shopName);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-order`,
        {
          params: { order_num: orderNum },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setOrderData(response.data);
        setShopName(response.data.shop_name);
        // setFormData({
        //   ...formData,
        //   shopName: orderData.shop_name
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchOrderDataInTable = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-order-data`,
        {
          params: { cust_id: email, order_num: orderNumber },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setOrderDataInTable(response.data.orderdatas);
        console.log(setOrderDataInTable);
        // setFormData({
        //   ...formData,
        //   shopName: orderData.shop_name
        // });
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  }

  useEffect(
    () => {
      const { orderNum } = formData;
      fetchOrderData(orderNum);
      setOrderNumber(orderNum);
    }, []
  )

  // useEffect(() => {
  //   if (formData.orderNum && formData.productName) {
  //     fetchOrderDataInTable();
  //   }
  // }, [formData.orderNum, formData.productName, email]);
  // useEffect(() => {
  //   if (formData.orderNum && formData.productName && email) {
  //     fetchOrderDataInTable();
  //   }
  // }, [formData.orderNum, formData.productName, email]);
  
  

  useEffect(() => {
    if (email) {
      fetchOrderDataInTable();
    }
  }, [email]);

  const fetchProducts = async () => {
    setError('');
    setMsg('');
    setIsFetching(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/fetch-products-by-shopname",
        {
          params: { shop_name: shopName },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.products.length == 0){
          // console.log(response.data.products.length);
          setInfo("Please add your products.")
        }
        else{
          setProducts(response.data.products);
          const categories = response.data.products.map(product => product.prod_category);
          const uniqueCategoriesSet = new Set(categories);
          setUniqueCategories(Array.from(uniqueCategoriesSet));
          console.log(products);
          console.log(uniqueCategories);
        }
      }
    } catch (error) {
      console.log(error);
      setError('Something gone wrong.');
    }
    finally {
      setIsFetching(false);
    }
  };

  const addOrderData = async () => {
    setError('');
    setMsg('');
    try {

      const { productName, productPrice, productQuant, applyCoupon} = formData;
      console.log(formData);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/order/add-to-order`,
        {
          order_num: orderNumber,
          cust_id: email,
          prod_name: productName,
          prod_price: productPrice,
          prod_quantity: productQuant,
          cpn_code: applyCoupon
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setMsg('Order added/updated successfully.');
        fetchOrderDataInTable();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

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

    addOrderData();
  };

  const handleRemoveData = async (dataId) => {
    setError('');
    setMsg('');
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/order/delete-order-data/${dataId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMsg('Product removed successfully.');
        setOrderDataInTable(orderDataInTable.filter(data => data._id !== dataId));
      }
    } catch (error) {
      console.log(error);
      // setError('Something gone wrong.');
      setError('Some error occured, Try again.');
    }
  };

  return (
    <>
      <div className="products">

        <form className="form" onSubmit={handleSubmit} method='post'>

          <span id="productsTitle">Add/Update Order</span>

          {/* <label htmlFor="orderNum">Order Number:</label>
          <div className="product-category-div order-shop-div">
            <input
              type="number"
              name="orderNum"
              id="orderNum"
              min="0"
              value={formData.orderNum}
              readOnly
              className="read-only-ip"
            />

            <label htmlFor="shopName">Shop Name:</label>
            <input
              type="text"
              name="shopName"
              id="shopName"
              value={formData.shopName}
              readOnly
              className="read-only-ip"
              required
            /> */}

          {/* <select
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
            </select> */}
          {/* </div> */}

          <label htmlFor="productCat">Product Category:</label>
          <select
              name="productCat"
              id="productCat"
              value={formData.productCat}
              onChange={handleInputChange}
              required
            >
              <option value="none">--Select category--</option>
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
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
              {
                products.map((product) => (
                  <option key={product._id} value={product.prod_name}>{product.prod_name}</option>
                ))

                // products.map((product) => (
                //   // <tr key={product._id}>
                //   //   <td className="pad-10">{index + 1}</td>
                //   <option value={product.prod_name}>{product.prod_name}</option>
                //   // </tr>
                // ))
              }
            </select>
          {/* <select
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
          </select> */}

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
            placeholder="Add Quantity"
            min="0"
            value={formData.productQuant}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="applyCoupon">Apply Coupon:</label>
          <select
            name="applyCoupon"
            id="applyCoupon"
            value={formData.applyCoupon}
            onChange={handleInputChange}
          >
            <option value="none">--Select coupon--</option>
            <option value="NA">NA</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
          </select>

          {/* <input
              type="text"
              name="applyCoupon"
              id="applyCoupon"
              value={formData.applyCoupon}
              onChange={handleInputChange}
            /> */}
          <button type="submit" className="btnProduct">Add to order</button>

        </form>


        <div className="tableContainer">
          <span id="productsTitle">Order</span>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-shopping-cart"></i>Order Number &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {formData.orderNum}</caption>
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i>Shop name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {orderData.shop_name}</caption>
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-time"></i>Order Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {orderData.datetime}</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Coupon</th>
                <th>Amount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                isFetching ? (
                  <tr>
                    <td colSpan="7" className="no-row loading-data">Loading...</td>
                  </tr>
                ) : (
                  orderDataInTable.length > 0 ? (
                    orderDataInTable.map((data, index) => (
                      <tr key={data._id}>
                        <td className="pad-10">{index + 1}</td>
                        <td>{data.prod_name}</td>
                        <td>{data.prod_price}</td>
                        <td>{data.prod_quantity}</td>
                        <td>{data.cpn_code}</td>
                        <td>{data.prod_price * data.prod_quantity}</td>
                        <td><button className="remove-btn" onClick={() => handleRemoveData(data._id)}>Remove</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-row">No product added.</td>
                    </tr>
                  )
                )
              }
            </tbody>
            
          </table>
          
        </div>

      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {info && <MessageBox msgTitle="No Product" msgText={info} />}
      {msg && <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />}
    </>
  )
}
