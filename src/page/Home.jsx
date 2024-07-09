import React from "react";
import "./Home.css";
import img from "../img/backimg.jpg";

const Home = () => {
  //   useEffect(() => {
  //     picture();
  //   }, []);

  //   const [img, setImg] = useState("");

  //   const picture = async () => {
  //     try {
  //       const response = await axios({
  //         url: "http://localhost:5000/",
  //         method: "GET",
  //       });
  //       console.log("response==", response);
  //       setImg(`data:image/jpeg;base64,${response.data.toString("base64")}`);
  //     } catch (error) {
  //       console.error("error==", error);
  //     }
  //   };

  return (
    <div className="home">
      {img ? (
        <img className="img" src={img} alt="서버 이미지 작업중입니다" />
      ) : (
        <p>이미지 로딩 중...</p>
      )}
    </div>
  );
};

export default Home;
