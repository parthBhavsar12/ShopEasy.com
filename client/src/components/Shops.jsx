import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Shops() {

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

  const [isCustomerDataAvailable, setIsCustomerDataAvailable] = useState();
  const [localShops, setLocalShops] = useState([]);
  const [distShops, setDistShops] = useState([]);
  const [area, setArea] = useState('');
  const [dist, setDist] = useState('');

  const fetchShopDataByArea = async (localArea) => {
    setIsFetching(true);
    setArea(localArea);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/user/get-shopdata-by-area`,
        {
          params: { "local_area": localArea },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.status);
        setLocalShops(response.data.shops);
        // console.log("shop fetching done.......", shops);
      }
    } catch (error) {
      // console.log(error);
    }
    finally {
      setIsFetching(false);
    }
  }

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
        fetchShopDataByArea(response.data.user.local_area);
        fetchShopDataByDist(response.data.user.district);

      }
    } catch (error) {
      // console.log(error);
      if (error.response.status == 404) {
        setIsCustomerDataAvailable(false);
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
  const [isLocalShopDivHidden, setIsLocalShopDivHidden] = useState(false);

  const handleViewShopsByArea = () => {
    setUnderlineLeft('underlined');
    setUnderlineRight('no-underline');
    setIsLocalShopDivHidden(false);
  }
  const handleViewShopsByDist = () => {
    setUnderlineLeft('no-underline');
    setUnderlineRight('underlined');
    setIsLocalShopDivHidden(true);
  }

  return (
    <>
      <div className={isLocalShopDivHidden ? "hidden-div" : "shop-keeper-home"}>
        <span id="shopTitle">Shops nearby you</span>
        {isCustomerDataAvailable ? (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value={area} className={underlineLeft} onClick={handleViewShopsByArea} />
            <input type="button" id="btnCheckStocks" value={dist} className={underlineRight} onClick={handleViewShopsByDist} />
          </div>
        ) : ('')
        }

        <div className="shop-container">
          {isCustomerDataAvailable ? (
            localShops.length > 0 ? (
              localShops.map((shop) => (
                <div className="shop-item" key={shop._id}>
                  {isFetching ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span className="shop"><i className="zmdi zmdi-store"></i>Shop name: </span>
                      <span>{shop.shop_name}</span>
                      <span className="shop"><i className="zmdi zmdi-pin"></i>Address:</span>
                      <span>{shop.address}, {shop.local_area}, {shop.district} - {shop.pin}</span>
                      <span className="shop"><i className="zmdi zmdi-phone"></i>Contact:</span>
                      <span>{shop.contact}</span>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="shop-item">
                <span>No shops registered.</span>
              </div>
            )
          ) : (
            <span className="no-cust-data">
              Please <Link to="/customer-account" className="a-href">insert</Link> your address details to find out shops nearby you.
            </span>
          )}
        </div>
      </div>
      <div className={isLocalShopDivHidden ? "shop-keeper-home" : "hidden-div"}>
        <span id="shopTitle">Shops nearby you</span>
        {isCustomerDataAvailable ? (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value={area} className={underlineLeft} onClick={handleViewShopsByArea} />
            <input type="button" id="btnCheckStocks" value={dist} className={underlineRight} onClick={handleViewShopsByDist} />
          </div>
        ) : ('')
        }

        <div className="shop-container">
          {isCustomerDataAvailable ? (
            distShops.length > 0 ? (
              distShops.map((shop) => (
                <div className="shop-item" key={shop._id}>
                  {isFetching ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span className="shop"><i className="zmdi zmdi-store"></i>Shop name: </span>
                      <span>{shop.shop_name}</span>
                      <span className="shop"><i className="zmdi zmdi-pin"></i>Address:</span>
                      <span>{shop.address}, {shop.local_area}, {shop.district} - {shop.pin}</span>
                      <span className="shop"><i className="zmdi zmdi-phone"></i>Contact:</span>
                      <span>{shop.contact}</span>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="shop-item">
                <span>No shops registered.</span>
              </div>
            )
          ) : (
            <span className="no-cust-data">
              Please <Link to="/customer-account" className="a-href">insert</Link> your address details to find out shops nearby you.
            </span>
          )}
        </div>
      </div>
    </>
  )
}
