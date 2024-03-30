import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <h1 className="h1-text">Chào mừng bạn đến với giao diện Quản lý</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
