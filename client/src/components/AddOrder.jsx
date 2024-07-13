import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import "../css/remove-btn.css";
import "../css/add_order.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [coupon, setCoupon] = useState("-");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);

  // shopName: 'none',
  const [formData, setFormData] = useState({
    orderNum: localStorage.getItem("order_num"),
    // productCat: "none",
    // productName: "none",
    // productPrice: "111",
    productQuant: "1",
    applyCoupon: "-",
  });

  const [orderData, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderDataInTable, setOrderDataInTable] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState(1);
  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role == "shopkeeper") {
          navigate("/shopkeeper-home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    if (shopName) {
      fetchProducts();
    }
  }, [shopName]);
  const fetchCoupons = async (shop_id, productName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/coupon/fetch-coupons`,
        {
          params: { shop_id: shop_id, prod_name: productName },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCouponData(response.data.coupons);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchCoupouns("abcxyz1345@protonmail.com", "iPhone");
  // }, []);
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
      if (response.status === 200) {
        setOrderData(response.data);
        setShopName(response.data.shop_name);
        setShopEmail(response.data.shop_id);
        // setFormData({
        //   ...formData,
        //   shopName: orderData.shop_name
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      if (response.status === 200) {
        setOrderDataInTable(response.data.orderdatas);
        // setFormData({
        //   ...formData,
        //   shopName: orderData.shop_name
        // });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const { orderNum } = formData;
    fetchOrderData(orderNum);
    setOrderNumber(orderNum);
  }, []);

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
    setError("");
    setMsg("");
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
        if (response.data.products.length == 0) {
          // console.log(response.data.products.length);
          setInfo("Please add your products.");
        } else {
          setProducts(response.data.products);
          const categories = response.data.products.map(
            (product) => product.prod_category
          );
          const uniqueCategoriesSet = new Set(categories);
          setUniqueCategories(Array.from(uniqueCategoriesSet));
        }
      }
    } catch (error) {
      console.log(error);
      setError("Something gone wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const addOrderData = async () => {
    setError("");
    setMsg("");
    try {
      // const { productQuant } = formData;
      console.log(formData);
      // console.log(shopName);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/order/add-to-order`,
        {
          order_num: orderNumber,
          cust_id: email,
          shop_name: shopName,
          prod_name: productName,
          prod_price: productPrice,
          prod_quantity: updateQuantity,
          cpn_code: coupon,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMsg("Order added/updated successfully.");
        fetchOrderDataInTable();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setFormData({ ...formData, productCat: category });
    const selectedCategory = e.target.value;
    const filterCategories = selectedCategory
      ? products.filter((product) => product.prod_category === selectedCategory)
      : products;

    setFilteredCategories(filterCategories);
  };
  const handleProductName = (e) => {
    setProductName(e.target.value);
    // setFormData({ ...formData, productName: productName });
    const selectedProduct = e.target.value;
    const filterProductByName = selectedProduct
      ? filteredCategories.filter(
        (product) => product.prod_name === selectedProduct
      )
      : filteredCategories;
    setFilteredProducts(filterProductByName);
    console.log(filterProductByName[0]?.prod_quantity);
    setProductPrice(filterProductByName[0]?.prod_price);
    setProductQuantity(filterProductByName[0]?.prod_quantity);
    fetchCoupons(shopEmail, selectedProduct);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      // productName: productName,
      // productCat: category,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log("Updated filteredCategories:", filteredCategories);
  }, [filteredCategories, filteredProducts]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    const { shopName, productName } = formData;

    if (shopName === "" && productName === "") {
      setError("Please select shop and product.");
      return;
    }

    if (shopName === "") {
      setError("Please select shop.");
      return;
    }

    if (productName === "") {
      setError("Please select product.");
      return;
    }

    addOrderData();
    setFormData({
      orderNum: localStorage.getItem("order_num"),
      productQuant: "1",
      applyCoupon: "-",
    });
    setCategory("");
    setProductName("");
    setProductPrice("");
  };

  const handleRemoveData = async (dataId) => {
    setError("");
    setMsg("");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/order/delete-order-data/${dataId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMsg("Product removed successfully.");
        setOrderDataInTable(
          orderDataInTable.filter((data) => data._id !== dataId)
        );
      }
    } catch (error) {
      console.log(error);
      // setError('Something gone wrong.');
      setError("Some error occured, Try again.");
    }
  };

  const totalDiscount = orderDataInTable.reduce(
    (acc, data) => acc + data.discount,
    0
  );
  const totalPrice = orderDataInTable.reduce(
    (acc, data) => acc + data.prod_price * data.prod_quantity,
    0
  );
  const totalAmount = totalPrice - totalDiscount;

  if (isFetching) {
    return <h1>Fetching Products...</h1>;
  }
  return (
    <>
      <div className="products">
        <form className="form" onSubmit={handleSubmit} method="post">
          <span id="productsTitle">Add/Update Order</span>

          <label htmlFor="productCat">Product Category:</label>
          <select
            name="productCat"
            id="productCat"
            value={category}
            onChange={handleCategory}
            required
          >
            <option value="none">--Select category--</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="productName">Product Name:</label>
          <select
            name="productName"
            id="productName"
            value={productName}
            onChange={handleProductName}
            required
          >
            <option value="none">--Select product--</option>
            {filteredCategories.map((product) => (
              <option key={product._id} value={product.prod_name}>
                {product.prod_name}
              </option>
            ))}
          </select>

          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            placeholder="Price will be shown here"
            min="0"
            value={productPrice ?? ""}
            readOnly
            className="read-only-ip"
          />

          <label htmlFor="productQuant">Product Quantity:</label>
          <select
            name="productQuant"
            id="productQuant"
            value={updateQuantity}
            onChange={(e) => setUpdateQuantity(e.target.value)}
            required
          >
            {/* <option value="none">--Select Quantity--</option> */}
            {/* <option key={productQuantity} value={productQuantity}>
              {productQuantity}
            </option> */}
            {[...Array(productQuantity)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          {/* <input
            type="number"
            name="productQuant"
            id="productQuant"
            placeholder="Add Quantity"
            min="0"
            value={formData.productQuant}
            onChange={handleInputChange}
            required
          /> */}

          <label htmlFor="applyCoupon">Apply Coupon:</label>
          <select
            name="applyCoupon"
            id="applyCoupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          >
            <option value="-" selected>
                    --Select coupon--
                  </option>
            {couponData.length > 0 ? (
              couponData.map((coupon, index) => (
                <>
                  {/* <option value="-" key={index} selected>
                    --Select coupon--
                  </option> */}

                  <option value={coupon.cpn_code} key={coupon.cpn_code}>
                    {coupon.cpn_code}
                  </option>
                </>
              ))
            ) : (
              <option value="none">--Select coupon--</option>
            )}
            {/* <option value="none">--Select coupon--</option> */}
          </select>

          {/* <input
              type="text"
              name="applyCoupon"
              id="applyCoupon"
              value={formData.applyCoupon}
              onChange={handleInputChange}
            /> */}
          <button type="submit" className="btnProduct">
            Add to order
          </button>
        </form>

        <div className="tableContainer">
          <span id="productsTitle">Order</span>
          <table className="productsTable">
            <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-shopping-cart"></i>Order Number
              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {formData.orderNum}
            </caption>
            <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-store"></i>Shop
              name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{" "}
              {orderData.shop_name}
            </caption>
            <caption className="shopNameOnOrder">
              <i className="zmdi zmdi-time"></i>Order
              Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{" "}
              {orderData.datetime}
            </caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Coupon</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="7" className="no-row loading-data">
                    Loading...
                  </td>
                </tr>
              ) : orderDataInTable.length > 0 ? (
                orderDataInTable.map((data, index) => (
                  <tr key={data._id}>
                    <td className="pad-10">{index + 1}</td>
                    <td>{data.prod_name}</td>
                    <td>{data.prod_price}</td>
                    <td>{data.prod_quantity}</td>
                    <td>{data.cpn_code}</td>
                    <td>{data.discount}</td>
                    <td>{data.prod_price * data.prod_quantity}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveData(data._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-row">
                    No product added.
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="8">
                  <strong>Total Price:</strong> {totalPrice.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="8">
                  <strong>Total Discount:</strong> {totalDiscount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="8">
                  <strong>Total Amount to be Paid:</strong> {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {info && <MessageBox msgTitle="No Product" msgText={info} />}
      {msg && (
        <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />
      )}
    </>
  );
}
