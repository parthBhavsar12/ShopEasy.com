import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Shops() {

  const navigate = useNavigate();

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

  return (
    <>
      <div className="shop-keeper-home">
        <span id="shopTitle">Shops nearby you</span>

        <div className="shop-container">
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
          <div className="shop-item">
            <span className="shop"><i class="zmdi zmdi-store"></i>Shop name: </span>
            <span>ABC store</span>
            <span className="shop"><i class="zmdi zmdi-pin"></i>Address:</span>
            <span >A/21, hdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhjhdhdhgs dshgdsfb dshjdsh, sjhdh, dhjds, sdhjhds, sdhj</span>
            <span className=" shop"><i class="zmdi zmdi-phone"></i>Contact:</span>
            <span>0123456789</span>
          </div>
        </div>
      </div>
    </>
  )
}
