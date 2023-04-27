//打rcc+ENTER
import React from "react";
// import "../navLink.css";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Product from "../elements/product";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { collection, query, onSnapshot, where, select } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import News from "../elements/newsAdmin";
import NewsCharity from "../elements/newsCharity";
import Notes from "../elements/notesAdmin";
import NotesCharity from "../elements/notesCharity";
import HomeImg from "../img/home.jpg";
import MyProduct from "../elements/myProduct";
import { Card } from "react-bootstrap";
import QrCodeList from "../elements/qrCodeList";
import ManagerProveList from "../elements/managerProveList";
import AllGoodsList from "../elements/allGoodsList";

function Task({ id, email, level }) {
  const [user] = useAuthState(auth);
  const report1 = {
    height: "300px",
    textAlign: "center",
    lineHeight: "280px",
    backgroundColor: "#FEF1E6",
  };
  const report2 = {
    height: "300px",
    textAlign: "center",
    lineHeight: "280px",
    backgroundColor: "#FEF1E6",
    fontSize: "18px",
    margin: "5px",
  };

  console.log(user.uid);
  const [donateRecord, setDonateRecord] = useState([]);
  console.log(donateRecord);
  useEffect(() => {
    let donateRecordTmp = [];
    const q = query(collection(db, "donate"), where("uid", "==", user.uid), where("paymentStatus", "==", "已付款"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        donateRecordTmp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(donateRecordTmp);
  
      const recordIDs = donateRecordTmp.map(record => record.donateList.map(item => item.id));
      const flattenIDs = recordIDs.reduce((acc, cur) => [...acc, ...cur], []);
      setDonateRecord(flattenIDs)
    });
  }, [user]);
  

  return (
    <div>
      {!user && (
        <Container>
          <div style={{ backgroundColor: "#ffffff" }}>
            <div style={{ height: "70px" }}></div>
            <div>
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播1
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播2
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播3
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播4
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播5
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                    }}
                  >
                    推播6
                  </h4>
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>最新消息</h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息1
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息2
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息3
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息4
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息5
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息6
                  </h4>
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>
                機構需求物資
              </h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
                <div>
                  <Product />
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>聯絡我們</h5>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    backgroundColor: "#FEF1E6",
                    textAlign: "center",
                    lineHeight: "230px",
                    fontWeight: "bold",
                  }}
                >
                  基本資訊
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
      {email === user.email && level === "member" && (
        <Container>
          <div style={{ backgroundColor: "#ffffff" }}>
            <div style={{ height: "70px" }}></div>
            <div>
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4 style={report1}>推播1</h4>
                </div>
                <div>
                  <h4 style={report1}>推播2</h4>
                </div>
                <div>
                  <h4 style={report1}>推播3</h4>
                </div>
                <div>
                  <h4 style={report1}>推播4</h4>
                </div>
                <div>
                  <h4 style={report1}>推播5</h4>
                </div>
                <div>
                  <h4 style={report1}>推播6</h4>
                </div>
              </Slider>
            </div>

            {/* <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#002B5B", fontWeight: "bold" }}>最新消息</h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息1
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息2
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息3
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息4
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息5
                  </h4>
                </div>
                <div>
                  <h4
                    style={{
                      height: "300px",
                      textAlign: "center",
                      lineHeight: "280px",
                      backgroundColor: "#FEF1E6",
                      fontSize: "18px",
                      margin: "5px",
                    }}
                  >
                    消息6
                  </h4>
                </div>
              </Slider>
            </div> */}

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#F58D59", fontWeight: "bold" }}>
                機構需求物資
              </h5>
              <Slider
                {...{
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                }}
              >
                <div>
                  <Product />
                </div>
              </Slider>
            </div>

            <div style={{ margin: "40px 0px 30px 0px" }}>
              <h5 style={{ color: "#F58D59", fontWeight: "bold" }}>聯絡我們</h5>
              <div style={{ paddingTop: "5px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    backgroundColor: "#FEF1E6",
                    textAlign: "center",
                    lineHeight: "230px",
                    fontWeight: "bold",
                  }}
                >
                  基本資訊
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
      {email === user.email && level === "admin" && (
        <Container style={{ marginBottom: "50px" }}>
          <div
            style={{
              marginTop: "100px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ margin: "10px", width: "70%" }}>
              <Card style={{ borderLeft: "3.5px solid #069a8e" }}>
                <Card.Header style={{ color: "#069a8e", fontWeight: "bold" }}>
                  申請資料審核
                </Card.Header>
                <Card.Body>
                  <ManagerProveList />
                </Card.Body>
              </Card>
            </div>
            <div style={{ margin: "10px", width: "30%" }}>
              <Card style={{ borderLeft: "3.5px solid #069a8e" }}>
                <Card.Header style={{ color: "#069a8e", fontWeight: "bold" }}>
                  物資一覽表
                </Card.Header>
                <Card.Body>
                  <div style={{marginLeft: "-20px"}}>
                    <AllGoodsList />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      )}
      {email === user.email && level === "charity" && (
        <Container style={{ marginBottom: "50px" }}>
          <div
            style={{
              marginTop: "100px",
              textAlign: "center",
            }}
          >
            <a
              href="#我的需求"
              style={{
                color: "white",
                backgroundColor: "#002b5b",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "10px 20px 10px 20px",
                borderRadius: "30px",
                marginRight: "20px",
              }}
            >
              我的需求
            </a>
            /
            <a
              href="#我的兌換條碼"
              style={{
                color: "white",
                backgroundColor: "#002b5b",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "10px 20px 10px 20px",
                borderRadius: "30px",
                marginLeft: "20px",
              }}
            >
              我的兌換條碼
            </a>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridGap: "20px",
                marginTop: "30px",
              }}
            >
              <div>
                <Card style={{ borderLeft: "3.5px solid #002b5b" }}>
                  <Card.Header
                    style={{
                      color: "#002b5b",
                      fontWeight: "bold",
                      backgroundColor: "var(--bs-card-cap-bg)",
                      textAlign: "left",
                    }}
                  >
                    <a name="我的需求">我的需求</a>
                  </Card.Header>
                  <Card.Body>
                    <MyProduct />
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card style={{ borderLeft: "3.5px solid #002b5b" }}>
                  <Card.Header
                    style={{
                      color: "#002b5b",
                      fontWeight: "bold",
                      backgroundColor: "var(--bs-card-cap-bg)",
                      textAlign: "left",
                    }}
                  >
                    <a name="我的兌換條碼">我的兌換條碼</a>
                  </Card.Header>
                  <Card.Body>
                    <QrCodeList />
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div></div>
          </div>
        </Container>
      )}
    </div>
  );
}

function NavbarComp() {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState([]);
  // console.log(details);
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);
  return (
    <div>
      {/* <h1 style={{textAlign: "center", marginTop: "350px"}}>首頁</h1> */}
      {details.map((item) => (
        <Task
          id={item.id}
          key={item.id}
          level={item.data.level}
          email={item.data.email}
        />
      ))}
    </div>
  );
}

export default NavbarComp;
