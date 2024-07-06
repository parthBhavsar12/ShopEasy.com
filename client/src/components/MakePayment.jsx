import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function MakePayment() {
  
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
    <div>MakePayment</div>
  )
}
