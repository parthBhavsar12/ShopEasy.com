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
      console.log(response);
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
      }
    } catch (error) {
      // console.log(error);
      if (error.response.status == 404) {
        setIsCustomerDataAvailable(false);
      }
    }
    finally {
      setIsFetching(false);
    }
  }

  // useEffect(() => {
  //     fetchCustomerData();
  // }, [isFetching]);

  useEffect(() => {
    if (email) {
      fetchCustomerData();
    }
  }, [email]);

  return (
    <>
      <div className="shop-keeper-home">
        <span id="shopTitle">Shops nearby you</span>

        <div className="shop-container">
          {
            isCustomerDataAvailable ? (
              <div className="shop-item">
                <span className="shop"><i className="zmdi zmdi-store"></i>Shop name: </span>
                <span>ABC store</span>
                <span className="shop"><i className="zmdi zmdi-pin"></i>Address:</span>
                <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
                <span className=" shop"><i className="zmdi zmdi-phone"></i>Contact:</span>
                <span>0123456789</span>
              </div>
            ) : (
              <span className="no-cust-data">Please <Link to="/customer-account" className="a-href">Insert</Link> your address details to find out Shops nearby you.</span>
            )
          }
        </div>
      </div>
    </>
  )
}
