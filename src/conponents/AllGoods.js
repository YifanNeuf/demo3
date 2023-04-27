import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import Navbar from "../elements/navbar";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import Card from "react-bootstrap/Card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import AllGoodsList from "../elements/allGoodsList";

function AllGoods() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate("");
  if (!user) {
    navigate("/signIn");
  }
  return (
    <div>
      <Navbar />
      <TitleSec name="物資一覽表" color="#7BBFBA" />
      <AllGoodsList />
    </div>
  );
}

export default AllGoods;
