import { NavLink } from "react-router-dom";
import "./navbar.css";
import {
  FaHome,
  FaClipboardList,
  FaUserCog,
  FaInfoCircle,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const user = "";
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <NavLink className="Logo" to="/">
          Tajriba
        </NavLink>

        <nav className="navbar">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buyurtmalar"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                Buyurtmalar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mutaxassislar"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                Mutaxassislar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/haqimizda"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                Biz haqimizda
              </NavLink>
            </li>
          </ul>
          <div className="siti-login">
            {user ? (
              <div className="nav-btn">
                <NavLink style={{ fontSize: 25, marginTop: 6 }} to="/profil">
                  <FaUser />
                </NavLink>
                <button
                  onClick={() => navigate("/create")}
                  className="nav-create_"
                >
                  <FaPlus />
                </button>
              </div>
            ) : (
              <div className="nav-btn">
                <button
                  onClick={() => navigate("/create")}
                  className="nav-create_"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="login-btn"
                >
                  Kirish
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="mobile-navbar">
        <nav className="mb-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                <FaHome />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buyurtmalar"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                <FaClipboardList />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mutaxassislar"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                <FaUserCog />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/haqimizda"
                className={({ isActive }) => (isActive ? "navbar-active" : "")}
              >
                <FaInfoCircle />
              </NavLink>
            </li>
            <li>
              {user ? (
                <NavLink
                  to="/profil"
                  className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                  }
                >
                  <FaUser />
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                  }
                >
                  <FaUser />
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
