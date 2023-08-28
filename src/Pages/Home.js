import React, { useState, useEffect,useContext } from "react";
import { Carousel, Card } from "antd";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import { useSelector, useDispatch } from 'react-redux';
import {setAuthUser, setUserLoginStatus} from '../features/authSlice';




export default function Home() {
  const authUser = useSelector(state => state.auth.authUser)
  const userLoginStatus = useSelector(state => state.auth.userLoginStatus)

  const dispatch = useDispatch();
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    if (userLoginStatus) {
      navigate("/");
    }
  }, [userLoginStatus]);
  

  useEffect(() => {
    fetch(
      "https://api.unsplash.com//photos/random?client_id=_gHCUNCi6-v4iUce4nK7Smc3rKXx7dNh3fdOCiQ_zFU&orientation=portrait&count=2"
    )
      .then((res) => res.json())
      .then((data) => setImageData(data))
      .catch((error) => console.log(error));
  }, []);

  let displayHTML = null;

  if (imageData.length > 0) {
    displayHTML = imageData.map((item, index) => {
      return (
        
        <Card
          key={index}
          hoverable
          style={{
            width: "100%",
          }}
          cover={<img alt="example" src={`${item.urls.regular}`} />}
        ></Card>
      );
    });
  } else {
    displayHTML = <h1>No images</h1>;
  }

  return (
    <div className="home-carousel-container">
      <div className="hero-section">
        {/* <h1 className="home-title">Find Best Quality Images</h1> */}
        <Carousel autoplay={true} dots={true}>
          {displayHTML}
        </Carousel>
      </div>
      <Login />
    </div>
  );
}
