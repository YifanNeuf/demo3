//打rcc+ENTER
import React, {useState, useEffect} from "react";
import "../App.css";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Product from "../elements/product";
import { collection, query, onSnapshot, limit, orderBy, where } from "firebase/firestore";
import { db } from "../utils/firebase";

function NavbarComp() {
  const bodyStyle = {
    backgroundColor: "#ffffff",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const settingsSec = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
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
  const titleSec = {
    fontWeight: "bold",
  };

  // 推播分析：瀏覽紀錄
  const [logData, setLogData] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, "clickLog"), orderBy("clickCount", "desc"), limit(6));
    onSnapshot(q, (querySnapshot) => {
      setLogData(
        querySnapshot.docs.map((doc) => (doc.id))
      );
    });
  }, []);

  const [charityData, setCharityData] = useState([]);

  // 預設資料
  const [charityData2, setCharityData2] = useState([
    {id: "001", name: "社團法人臺中市響響輔助科技協會", photo: "https://www.starfamily.org.tw/assets/upload/adver/30.webp"},
    {id: "002", name: "社團法人中華民國身障關懷協會", photo: "https://www.accfct.org.tw/uploads/1/4/1/6/141606775/112-1_orig.jpg"},
    {id: "003", name: "社團法人臺中市響響輔助科技協會", photo: "https://www.post.gov.tw/post/FileCenter/post_ww2/post_docdata_att/att_content/B396C802-0F3C-461A-BFAA-5C77307E3122/D243C0EB-23C6-4E7F-AFE3-DECBDA5D243F.jpg"},
    {id: "004", name: "社團法人中華民國身障關懷協會", photo: "https://www.tdca.org.tw/img/index/hopefruit.png"},
    {id: "005", name: "社團法人臺中市響響輔助科技協會", photo: "https://www.post.gov.tw/post/FileCenter/post_ww2/post_docdata_att/att_content/920151F8-FEAC-4289-A93D-9CAA03773351/FA6274BC-6CAF-40FB-9C1B-345AE8EE36B6.jpeg"},
    {id: "006", name: "社團法人中華民國身障關懷協會", photo: "https://firebasestorage.googleapis.com/v0/b/donation-platform-54f2b.appspot.com/o/%E9%9F%BF%E9%9F%BF.png?alt=media&token=1099b9f1-2d93-4eba-a082-b4ae02f9393e"}
  ])

  useEffect(() => {
    let fetchedCharityData = [];
    if (logData) {
      
      // 使用 forEach 方法遍歷 logData，依序查詢 Firestore 資料
      logData.forEach((id) => {
        // console.log(id);
        const docRef = query(collection(db, "charity"), where("uid", "==", id));
        onSnapshot(docRef, (querySnapshot) => {
          querySnapshot.docs.map((doc) => fetchedCharityData.push(doc.data()))
          setCharityData(fetchedCharityData)
          // querySnapshot.docs.map((doc) => setCharityData([...charityData, doc.data()]))
        });
      });
      // console.log(fetchedCharityData);
      // let fetchedCharityData2 = fetchedCharityData.map(charity => ({
      //   id: charity.uid,
      //   name: charity.info.name,
      //   photo: charity.file.img.photo
      // }));
      // console.log(fetchedCharityData2);
      
      // 等待所有查詢完成後，將 fetchedCharityData 設為 charityData 狀態
      ;
      // console.log(charityData);
    }
  }, [logData]);

  // useEffect(() => {
  //   console.log('start');
  //   console.log("Charity data changed:", charityData);
  //   if (charityData !== null) {
  //     console.log(charityData.length);
  //   }
  //   console.log('end0');
  // }, [charityData]);

  return (
    <div>
      {/* <h1 style={{textAlign: "center", marginTop: "350px"}}>首頁</h1> */}
      <div style={bodyStyle}>
        <div style={{ height: "70px" }}></div>
        <div>
          <Slider {...settings}>
            <div>
              <h4 style={report1}>推播1</h4>
            </div>
            <div>
              <h4 style={report1}>推播2</h4>
            </div>
            <div>
              <h4 style={report1}>推播3</h4>
            </div>
            {/* <div>
              <h4 style={report1}>推播4</h4>
            </div>
            <div>
              <h4 style={report1}>推播5</h4>
            </div>
            <div>
              <h4 style={report1}>推播6</h4>
            </div> */}
          </Slider>
        </div>

        <div>
          <Container>
            <div
              style={{
                margin: "40px 0px 0px 0px",
                padding: "20px 0px 30px 0px",
              }}
            >
              <h5 style={titleSec}>最新消息</h5>
              <Slider {...settingsSec}>
                {/* {content} */}
                {charityData.length === 6 ?
                  (
                    charityData.map((item, index) => (
                      <div key={index}>
                        <img style={report2} src={item.file?.img?.photo} alt={item.info?.name} />
                      </div>
                    ))
                  ) :
                  (
                    charityData2.map((item, index) => (
                      <div key={index}>
                        <img style={report2} src={item.photo} alt={item.name} />
                      </div>
                    ))                   
                  )
                }
              </Slider>
            </div>
          </Container>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <Container>
            <div style={{ padding: "20px 0px 30px 0px" }}>
              <h5 style={titleSec}>機構需求物資</h5>
              <div>
                <Product />
              </div>
            </div>
          </Container>
        </div>

        <footer
          style={{
            backgroundColor: "#F4D19B",
            height: "300px",
            textAlign: "center",
            lineHeight: "300px",
          }}
        >
          聯絡我們
        </footer>
      </div>
    </div>
  );
}

export default NavbarComp;
