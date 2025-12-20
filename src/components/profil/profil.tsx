import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useEffect } from "react";
>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b
import "./profil.css";

function Profil() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [count, setCount] = useState("0");
  const [resumes, setResumes] = useState("0");
  const [buyurtma, setBuyurtma] = useState("0");
=======
>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

<<<<<<< HEAD
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/count");
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch(
          "https://tajriba-a32v.onrender.com/api/resume/all"
        );
        const data = await res.json();
        setResumes(data.resumes.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const res = await fetch(
          "https://tajriba-a32v.onrender.com/api/order/all"
        );
        const data = await res.json();
        setBuyurtma(data.orders.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderCount();
  }, []);

=======
>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b
  if (!user) return null;

  return (
    <div className="profil-wrapper">
      <div className="profil-container">
        <div className="user-card">
          <div className="user-avatar-wrapper">
            <img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="User"
              className="user-avatar"
            />
            <div className="status-badge"></div>
          </div>

          <div className="user-info text-center">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="admin-panels">
          {user.email === "tursunboyevakbarali807@gmail.com" ? (
            <div className="main-page_a">
              <div className="user-soni">
                <p>Foydalanuvchilar</p>
                <span>{count}</span>
              </div>
              <div className="user-soni">
                <p>Repositori</p>
                <span>{resumes}</span>
              </div>
              <div className="user-soni">
                <p>Buyurtmalar</p>
                <span>{buyurtma}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="actions-grid">
          <Link title="Elon joylash" to="/create" className="action-item">
            <div className="icon-circle">📄</div>
            <span>Elon joylash</span>
          </Link>

=======
        <div className="actions-grid">
          <Link title="Elon joylash" to="/create" className="action-item">
            <div className="icon-circle">📄</div>
            <span>Elon joylash</span>
          </Link>

>>>>>>> 744f8b1935d50df70c25cc807ce57172e9e3c11b
          {/* <Link title="Buyurtma berish" to="/buyurtma" className="action-item">
            <div className="icon-circle">💼</div>
            <span>Buyurtma joylash</span>
          </Link> */}

          <div className="action-item logout" onClick={handleLogout}>
            <div className="icon-circle">🚪</div>
            <span>Tizimdan chiqish</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
