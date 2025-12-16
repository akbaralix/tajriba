import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./profil.css";

function Profil() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) {
    return <h2>User login qilmagan</h2>;
  }

  return (
    <div className="profil-container">
      <div className="user-profil">
        <div className="user-profil_img">
          <img src={user.photo} alt="User" />
        </div>

        <div className="user-profil_name">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="add-counter">
        <a href="/create" className="count">
          <p>Resume yaratish</p>
        </a>
        <a href="/buyurtma" className="count">
          <p>Buyurtma joylash</p>
        </a>
        <div className="count">
          <p>Chiqish</p>
        </div>
      </div>
    </div>
  );
}

export default Profil;
