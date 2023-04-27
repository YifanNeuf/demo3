import { Container, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import DemandStep3 from "../elements/demandStep3";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stepper } from "react-form-stepper";
import shortUUID from "short-uuid";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  // const nextStepStyle = {
  //   marginLeft: "10px",
  // };
  const nextStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    marginLeft: "10px",
    height: "35px",
    fontWeight: "bold",
  };
  // const returnStepStyle = {
  //   marginLeft: "39%",
  // };
  const returnStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    // marginLeft: "39%",
    // marginTop: "40px"
  };
  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "25px",
    textAlign: "center",
  };

  let demandList = JSON.parse(localStorage.getItem("demandList"));
  // const [demandId, setDemandId] = useState(shortUUID.generate());

  const handleSubmit = async () => {
    try {
      for (let i = 0; i < demandList.length; i++) {
        let demandId = shortUUID.generate();
        await setDoc(doc(db, "demand", demandId), {
          name: demandList[i].name,
          availability: 0,
          charity: demandList[i].charityName,
          description: demandList[i].demandInfo,
          quantity: demandList[i].count,
          received: 0,
          state: "徵求中",
          store: demandList[i].store,
          pic: demandList[i].pic,
          uid: user.uid,
          id: demandId,
          price: demandList[i].price
        });
      }
      navigate("/myDemand");
      alert("刊登成功。");
      localStorage.removeItem("demandList");
      localStorage.removeItem("cart");
    } catch (err) {
      console.log(err);
      window.location.reload();
      alert("刊登不成功，請再試一次，謝謝。");
    }
  };

  return (
    <div>
      <Navbar />
      <TitleSec name="刊登物資需求" color="#90AACB"/>
      <Container>
      <Stepper
          steps={[
            { label: "選鑿需求物資" },
            { label: "填寫資料" },
            { label: "確認送出" },
            // { label: "完成" },
          ]}
          activeStep={2}
        />
        <TitleStep name="STEP3&nbsp;-&nbsp;確認並送出" />
        {demandList ? (
          demandList.map((item, index) => (
            <>
              <DemandStep3
                key={index}
                id={item.id}
                name={item.name}
                pic={item.pic}
                store={item.store}
                demandInfo={item.demandInfo}
                count={item.count}
                user={item.charityName}
              />
            </>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "35px" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ※請返回上一頁填寫需求物資之資料。
            </p>
          </div>
        )}
        {demandList ? (
          <p
            style={{
              fontSize: "17px",
              textAlign: "center",
              marginTop: "10px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ※需求資訊刊登後，仍可進行更改。
          </p>
        ) : (
          ""
        )}
        <div style={stepBtnStyle}>
          <Link to="/uploadDemandSec">
            <button
              style={returnStepStyle}
              onClick={() => {
                localStorage.removeItem("demandList");
              }}
            >
              返回
            </button>
          </Link>
          {demandList !== null ? (
            <button style={nextStepStyle} onClick={handleSubmit}>
              刊登
            </button>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;