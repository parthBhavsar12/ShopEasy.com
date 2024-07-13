import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Coupons() {
  const [minDateTime, setMinDateTime] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDateTime(formattedDateTime);
  }, []);

  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role == "customer") {
          navigate("/customer-home");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Something gone wrong.");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const fetchProducts = async () => {
    setIsFetching(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/fetch-products",
        {
          params: { user_id: email },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts(response.data.products);
        const categories = response.data.products.map(
          (product) => product.prod_category
        );
        const uniqueCategoriesSet = new Set(categories);
        setUniqueCategories(Array.from(uniqueCategoriesSet));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   if (email) {
  //     fetchProducts();
  //   }
  // }, [email]);

  const [coupons, setCoupons] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchCoupons = async () => {
    setIsFetching(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/coupon/fetch-coupons",
        {
          params: { shop_id: email },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCoupons(response.data.coupons);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchCoupons();
      fetchProducts();
    }
  }, [email]);

  // useEffect(() => {
  //   fetchCoupons();
  // }, [isFetching]);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    cpnCode: "",
    cpnQuant: "",
    cpnDiscount: "0",
    // cpnStartDate: "",
    // cpnEndDate: "",
    productName: "none",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    const { cpnCode, cpnQuant, cpnDiscount, productName } = formData;
    // let { cpnStartDate, cpnEndDate } = formData;
    // const printMsg = `Coupun added successfully. Code: ${cpnCode}, Quantity: ${cpnQuant}, Discount (%): ${cpnDiscount}, Time Duration: ${cpnStartDate} - ${cpnEndDate}`

    // console.log('Form submitted successfully', formData);

    // cpnStartDate = cpnStartDate.replace("T", " ");
    // cpnEndDate = cpnEndDate.replace("T", " ");

    if (productName === "none") {
      setError("Please select product.");
      return;
    }

    // if (new Date(cpnEndDate) <= new Date(cpnStartDate)) {
    //   setError("End date-time must be after start date-time.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/coupon/add-coupon",
        {
          shop_id: email,
          cpn_code: cpnCode.toUpperCase(),
          prod_name: productName,
          cpn_quantity: cpnQuant,
          cpn_discount: cpnDiscount,
          // start_datetime: cpnStartDate,
          // end_datetime: cpnEndDate,
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
        setMsg("Coupon added successfully.");
        fetchCoupons();
      }
    } catch (error) {
      console.log(error);
      setError("Some error occured, Try again.");
    }
  };

  const handleRemoveCoupon = async (couponId) => {
    setMsg("");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/coupon/delete-coupon/${couponId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMsg("Coupon removed successfully.");
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
      }
    } catch (error) {
      // console.log(error);
      setError("Some error occured, Try again.");
    }
  };

  return (
    <>
      <div className="products" id="updateProducts">
        <form className="form" onSubmit={handleSubmit} method="post">
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

          <label htmlFor="productName">Coupon for Product:</label>
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
                <option key={product._id} value={product.prod_name}>
                  {product.prod_name}
                </option>
              ))

              // products.map((product) => (
              //   // <tr key={product._id}>
              //   //   <td className="pad-10">{index + 1}</td>
              //   <option value={product.prod_name}>{product.prod_name}</option>
              //   // </tr>
              // ))
            }
          </select>

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

          {/* <label htmlFor="cpnStartDate">Start Date-Time:</label>
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
          /> */}

          <button type="submit" className="btnProduct">
            Add Coupon
          </button>
        </form>

        <div className="tableContainer">
          <span id="productsTitle">Coupons</span>
          <table className="productsTable">
            <thead>
              <tr>
                <th className="pad-10">#</th>
                <th>Coupon Code</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Discount (%)</th>
                {/* <th>Start Date-Time</th>
                <th>End Date-Time</th> */}
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="8" className="no-row loading-data">
                    Loading...
                  </td>
                </tr>
              ) : coupons.length > 0 ? (
                coupons.map((coupon, index) => (
                  <tr key={coupon._id}>
                    <td className="pad-10">{index + 1}</td>
                    <td>{coupon.cpn_code}</td>
                    <td>{coupon.prod_name}</td>
                    <td>{coupon.cpn_quantity}</td>
                    <td>{coupon.cpn_discount}</td>
                    {/* <td>{coupon.start_datetime}</td>
                    <td>{coupon.end_datetime}</td> */}
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveCoupon(coupon._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-row">
                    No coupon found.
                  </td>
                </tr>
              )}
            </tbody>
            {/* <tbody>
              {
                isFetching ? (
                  <tr>
                    <td colSpan="6" className="no-row loading-data">Loading...</td>
                  </tr>
                ) : (

                  coupons.length > 0 ? (
                    coupons.map((coupon, index) => (
                      <tr key={coupon._id}>
                        <td className="pad-10">{index + 1}</td>
                        <td>{coupon.cpn_code}</td>
                        <td>{coupon.cpn_quantity}</td>
                        <td>{coupon.cpn_discount}</td>
                        <td>{coupon.start_datetime}</td>
                        <td>{coupon.end_datetime}</td>
                        <td><button className="remove-btn" onClick={() => handleRemoveCoupon(coupon._id)}>Remove</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-row">No coupon found.</td>
                    </tr>
                  )
            }
            </tbody> */}
          </table>
        </div>
      </div>
      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {msg && (
        <MessageBox colorClass="msgBoxGreen" msgTitle="Success" msgText={msg} />
      )}
    </>
  );
}
