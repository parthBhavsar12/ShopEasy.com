import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import '../css/remove-btn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import getCurrentDateTime from '../currentDateTime';

export default function MakeOrder() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);

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
  }, []);

  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [page, setPage] = useState('new');
  const [formData, setFormData] = useState({
    shopName: 'none',
    orderNum: 'none'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isCustomerDataAvailable, setIsCustomerDataAvailable] = useState();
  const [dist, setDist] = useState('');
  const [custName, setCustName] = useState('');
  // const [shop_name, setShopName] = useState('');
  const [distShops, setDistShops] = useState([]);
  const [custOrders, setCustOrders] = useState([]);

  const postNewOrderData = async (shopName) => {

    // console.log("Email: ", email);
    // console.log("cust_name: ", custName);
    // console.log("shop_name: ", shopName);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/order/new-order`,
        {
          "cust_id": email,
          "cust_name": custName,
          "shop_name": shopName,
          "status": "not_complete"
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("order_num", response.data.order);
        navigate('/add-to-order');
      }
    } catch (error) {
      // console.log(error);
    }
  }

  const fetchCustomerOrders = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/order/find-customer-order-data`,
        {
          params: { cust_id: email },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setCustOrders(response.data.orderdatas);
        // const uniqueOrderNums = new Set(response.data.orderdatas.map(order => order.order_num));
        // // Converting Set back to array and sorting
        // setCustOrders(Array.from(uniqueOrderNums).sort((a, b) => a - b));
        // console.log(custOrders);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  }

  // useEffect(() => {
  //   fetchCustomerOrders();
  //   }
  // );
  useEffect(() => {
    if (email) {
      fetchCustomerOrders();
    }
  }, [email]);

  const navigateToUpdate = (orderNum)=>{
    localStorage.setItem("order_num", orderNum);
    navigate('/add-to-order');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { shopName, orderNum } = formData;
    // console.log("Shop@handleSubmit", shopName);

    if (shopName === "none" && page == "new") {
      setError('Please select shop.');
      return;
    }

    if (orderNum === "none" && page == "update") {
      setError('Please select order.');
      return;
    }

    // console.log('Form submitted successfully', formData);
    (page == "new") ? postNewOrderData(shopName) : navigateToUpdate(orderNum);
    // console.log('Form submitted successfully', formData);
  };

  const fetchShopDataByDist = async (dist) => {
    setIsFetching(dist);
    setDist(dist);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/user/get-shopdata-by-district`,
        {
          params: { "district": dist },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.status);
        setDistShops(response.data.shops);
        // console.log("shop fetching done.......", shops);
      }
    } catch (error) {
      // console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  }

  const fetchCustomerData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/user/is-customer-data-available`,
        {
          params: { email },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setIsCustomerDataAvailable(true);
        fetchShopDataByDist(response.data.user.district);
        setCustName(response.data.user.customer_name);

      }
    } catch (error) {
      // console.log(error);
      if (error.response.status == 404) {
        setIsCustomerDataAvailable(false);
        setInfo("Please insert your address details to make an order.");
        setTimeout(
          () => {
            navigate('/shopkeeper-account');
          }, 2500
        )
      }
    }
    finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (email) {
      fetchCustomerData();
    }
  }, [email]);


  const [underlineLeft, setUnderlineLeft] = useState('underlined');
  const [underlineRight, setUnderlineRight] = useState('no-underline');
  const [isMakeOrderDivHidden, setIsMakeOrderDivHidden] = useState(false);

  const handleViewMakeOrder = () => {
    setUnderlineLeft('underlined');
    setUnderlineRight('no-underline');
    setIsMakeOrderDivHidden(false);
    setPage('new');
    setError('');
  }
  const handleViewUpdateOrder = () => {
    setUnderlineLeft('no-underline');
    setUnderlineRight('underlined');
    setIsMakeOrderDivHidden(true);
    setPage('update');
    setError('');
  }

  return (
    <>
      <div className={isMakeOrderDivHidden ? "hidden-div" : "products make-order-div"}>
        {isCustomerDataAvailable ? (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value="Make New Order" className={underlineLeft} onClick={handleViewMakeOrder} />
            <input type="button" id="btnCheckStocks" value="Update Order" className={underlineRight} onClick={handleViewUpdateOrder} />
          </div>
        ) : ('')
        }
        <form className="form" onSubmit={handleSubmit} method='post'>

          {/* <span id="productsTitle">Make New Order</span> */}

          <label htmlFor="shopName">Shop Name:</label>
          <select
            name="shopName"
            id="shopName"
            value={formData.shopName}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select shop--</option>
            {
              distShops.length > 0 ? (
                distShops.map((shop, index) => (
                  isFetching ? (
                    <option value="none" key={index}>Loading...</option>
                  ) : (
                    <option value={shop.shop_name} key={shop.shop_name}>{shop.shop_name}</option>
                  )
                ))
              ) : (
                ''
              )
            }

          </select>
          <button type="submit" className="btnProduct btn-confirm"><i className="zmdi zmdi-forward"></i>Confirm</button>
        </form>
      </div>
      <div className={isMakeOrderDivHidden ? "products make-order-div" : "hidden-div"}>
        {isCustomerDataAvailable ? (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value="Make New Order" className={underlineLeft} onClick={handleViewMakeOrder} />
            <input type="button" id="btnCheckStocks" value="Update Order" className={underlineRight} onClick={handleViewUpdateOrder} />
          </div>
        ) : ('')
        }
        <form className="form" onSubmit={handleSubmit} method='post'>

          {/* <span id="productsTitle">Make New Order</span> */}

          <label htmlFor="orderNum">Order Number:</label>
          <select
            name="orderNum"
            id="orderNum"
            value={formData.orderNum}
            onChange={handleInputChange}
            required
          >
            <option value="none">--Select Order--</option>
            {
              custOrders.length > 0 ? (
                custOrders.map((order, index) => (
                  isFetching ? (
                    <option value="none" key="loading">Loading...</option>
                  ) : (
                    <option value={order.order_num} key={index}>{order.order_num} - {order.shop_name} - {order.datetime}</option>
                  )
                ))
              ) : (
                ''
              )
            }

          </select>
          <button type="submit" className="btnProduct btn-confirm"><i className="zmdi zmdi-forward"></i>Confirm</button>
        </form>
      </div>

      {error && <MessageBox msgTitle="Error" msgText={error} />}
      {info && <MessageBox msgTitle="No Data" msgText={info} />}
    </>
  )
}
