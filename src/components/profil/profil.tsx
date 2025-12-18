import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./profil.css";

function Profil() {
  const navigate = useNavigate();

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

        <div className="actions-grid">
          <Link title="Elon joylash" to="/create" className="action-item">
            <div className="icon-circle">📄</div>
            <span>Elon joylash</span>
          </Link>

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
