import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Shops() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setEmail(response.data.user.email);
        if (response.data.user.role === "shopkeeper") {
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

  const [isCustomerDataAvailable, setIsCustomerDataAvailable] = useState(false);
  const [localShops, setLocalShops] = useState([]);
  const [distShops, setDistShops] = useState([]);
  const [area, setArea] = useState('');
  const [dist, setDist] = useState('');

  const fetchShopDataByArea = async (localArea) => {
    setIsFetching(true);
    setArea(localArea);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/get-shopdata-by-area`, {
        params: { local_area: localArea },
        withCredentials: true,
      });
      if (response.status === 200) {
        setLocalShops(response.data.shops);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchShopDataByDist = async (dist) => {
    setIsFetching(true);
    setDist(dist);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/get-shopdata-by-district`, {
        params: { district: dist },
        withCredentials: true,
      });
      if (response.status === 200) {
        setDistShops(response.data.shops);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchCustomerData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/is-customer-data-available`, {
        params: { email },
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsCustomerDataAvailable(true);
        fetchShopDataByArea(response.data.user.local_area);
        fetchShopDataByDist(response.data.user.district);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsCustomerDataAvailable(false);
        setTimeout(() => {
          navigate('/shopkeeper-account');
        }, 2500);
      } else {
        console.log(error);
      }
    } finally {
      setIsFetching(false);
    }
  };

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
  };

  const handleViewShopsByDist = () => {
    setUnderlineLeft('no-underline');
    setUnderlineRight('underlined');
    setIsLocalShopDivHidden(true);
  };

  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState('');
  const [areProductsVisible, setProductsVisible] = useState(false);

  const fetchProducts = async (shopName) => {
    setIsFetching(true);
    setShopName(shopName);

    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/fetch-products-by-shopname", {
        params: { shop_name: shopName },
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.products.length === 0) {
          setInfo("No products found.");
        } else {
          setProducts(response.data.products);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  // const handleViewProducts = (shopName) => {
  //   fetchProducts(shopName);
  //   setProductsVisible(true);
  // };

  const handleViewProducts = (shopName) => {
    setProducts([]);  // Clear the products state before fetching new data
    fetchProducts(shopName);
    setProductsVisible(true);
  };
  

  return (
    <>
      <div className={isLocalShopDivHidden ? "hidden-div" : "shop-keeper-home"}>
        <span id="shopTitle">Shops nearby you</span>
        {isCustomerDataAvailable && (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value={area} className={underlineLeft} onClick={handleViewShopsByArea} />
            <input type="button" id="btnCheckStocks" value={dist} className={underlineRight} onClick={handleViewShopsByDist} />
          </div>
        )}
        <div className={areProductsVisible ? "products-table" : "hidden-products-table"}>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i> Products: {shopName}</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="3" className="no-row loading-data">Loading...</td>
                </tr>
              ) : (
                products.length > 0 ? (
                  products.map((data, index) => (
                    <tr key={data._id}>
                      <td className="pad-10">{index + 1}</td>
                      <td>{data.prod_name}</td>
                      <td>{data.prod_price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-row">No products found.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <button className="closeProductsDiv" onClick={() => setProductsVisible(false)}><i className="zmdi zmdi-close"></i> Close</button>
        </div>

        <div className="shop-container">
          {isCustomerDataAvailable ? (
            localShops.length > 0 ? (
              localShops.map((shop) => (
                <div className="shop-item" key={shop._id}>
                  {isFetching ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span className="shop"><i className="zmdi zmdi-store"></i>Shop name: <button className="viewProductsBtn" onClick={() => handleViewProducts(shop.shop_name)}>View Products</button></span>
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
        {isCustomerDataAvailable && (
          <div className="shopKeeperHomeBtns">
            <input type="button" id="btnYourOrders" value={area} className={underlineLeft} onClick={handleViewShopsByArea} />
            <input type="button" id="btnCheckStocks" value={dist} className={underlineRight} onClick={handleViewShopsByDist} />
          </div>
        )}

        
<div className={areProductsVisible ? "products-table" : "hidden-products-table"}>
          <table className="productsTable">
            <caption className="shopNameOnOrder"><i className="zmdi zmdi-store"></i> Products: {shopName}</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price per unit</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="3" className="no-row loading-data">Loading...</td>
                </tr>
              ) : (
                products.length > 0 ? (
                  products.map((data, index) => (
                    <tr key={data._id}>
                      <td className="pad-10">{index + 1}</td>
                      <td>{data.prod_name}</td>
                      <td>{data.prod_price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-row">No products found.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <button className="closeProductsDiv" onClick={() => setProductsVisible(false)}><i className="zmdi zmdi-close"></i> Close</button>
        </div>

        <div className="shop-container">
          {isCustomerDataAvailable ? (
            distShops.length > 0 ? (
              distShops.map((shop) => (
                <div className="shop-item" key={shop._id}>
                  {isFetching ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span className="shop">
                        <i className="zmdi zmdi-store"></i>Shop name: 
                        <button className="viewProductsBtn" onClick={() => handleViewProducts(shop.shop_name)}>View Products</button>
                      </span>
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
  );
}
