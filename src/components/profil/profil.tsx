import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { FaClock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { formatTime } from "../../utils"; // utils.ts faylga nisbatan path

import "./profil.css";

interface Resume {
  _id: string;
  userId: string;
  kasb: string;
  bio: string;
  tguser: string;
  username?: string;
  soha?: string;
  userpic?: string;
  createdAt: string;
  views?: number;
}

interface Orders {
  _id: string;
  userId: string;
  creator: string;
  title: string;
  description: string;
  budget: string;
  createdAt: string;
  creatorpic?: string;
  tguserorder?: string;
  views?: number;
}

function Profil() {
  const navigate = useNavigate();
  const [count, setCount] = useState("0");
  const [buyurtmaTotal, setBuyurtmaTotal] = useState(0);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [myOrders, setMyOrders] = useState<Orders[]>([]);
  const [logouts, setlogouts] = useState(false);

  // Tab almashtirish uchun state
  const [activeTab, setActiveTab] = useState<"resumes" | "orders">("resumes");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(
          "https://tajriba-a32v.onrender.com/api/user/count"
        );
        const userData = await userRes.json();
        setCount(userData.count);

        const resumeRes = await fetch(
          "https://tajriba-a32v.onrender.com/api/resume/all"
        );
        const resumeData = await resumeRes.json();
        setResumes(resumeData.resumes || []);

        const orderRes = await fetch(
          "https://tajriba-a32v.onrender.com/api/order/all"
        );
        const orderData = await orderRes.json();
        const allOrders = orderData.orders || [];
        setMyOrders(allOrders);
        setBuyurtmaTotal(allOrders.length);
      } catch (error) {
        console.error("Ma'lumot yuklashda xato:", error);
      }
    };

    if (user) fetchData();
  }, []);

  const myOwnResumes = resumes.filter(
    (item) => item.userId === user?.uid || item.userId === user?.userId
  );

  const myOwnOrders = myOrders.filter(
    (item) => item.userId === user?.uid || item.userId === user?.userId
  );

  const handleDeleteResume = async (resumeId: string) => {
    if (!window.confirm("Rostdan ham ushbu e'lonni o'chirmoqchimisiz?")) return;
    try {
      const response = await fetch(
        `https://tajriba-a32v.onrender.com/api/resume/${resumeId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error();
      setResumes((prev) => prev.filter((res) => res._id !== resumeId));
      toast.success("E'lon o'chirildi");
    } catch (error) {
      toast.error("O'chirishda xatolik yuz berdi!");
    }
  };

  if (!user) return null;

  return (
    <div>
      <ToastContainer position="top-center" />

      <div className="profil-wrapper">
        {logouts && (
          <div className="overlay">
            <div className="logout-container">
              <h3>Haqiqatdan ham hisobdan chiqmoqchimisiz?</h3>
              <div className="logout-btn">
                <button className="confirm-btn" onClick={handleLogout}>
                  Ha
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setlogouts(false)}
                >
                  Yo'q
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="profil-container">
          <div className="user-card">
            <div className="user-avatar-wrapper">
              <img
                src={user.photo || user.photoURL || "/default-user.png"}
                alt="Avatar"
                className="user-avatar"
              />
              <div className="status-badge"></div>
            </div>
            <div className="user-info text-center">
              <h2 className="user-name">{user.displayName || user.name}</h2>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          {user.email === "tursunboyevakbarali807@gmail.com" && (
            <div className="main-page_a">
              <div className="user-soni">
                <p>A'zolar</p>
                <span>{count}</span>
              </div>
              <div className="user-soni">
                <p>E'lonlar</p>
                <span>{resumes.length}</span>
              </div>
              <div className="user-soni">
                <p>Buyurtmalar</p>
                <span>{buyurtmaTotal}</span>
              </div>
            </div>
          )}

          {/* TAB BUTTONS - O'rtadagi almashtirgich */}
          <div className="user-actions_profile">
            <div
              className={`resumes-actions prof-act ${
                activeTab === "resumes" ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab("resumes")}
              style={{
                cursor: "pointer",
                borderBottom:
                  activeTab === "resumes" ? "2px solid #007bff" : "none",
              }}
            >
              <p>Resumelar</p>
              <span>{myOwnResumes.length}</span>
            </div>
            <div
              className={`orders-actions prof-act ${
                activeTab === "orders" ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab("orders")}
              style={{
                cursor: "pointer",
                borderBottom:
                  activeTab === "orders" ? "3px solid #087fffff" : "none",
              }}
            >
              <p>Buyurtmalar</p>
              <span>{myOwnOrders.length}</span>
            </div>
          </div>

          <div className="actions-grid">
            <Link to="/create" className="action-item">
              <div className="icon-circle">📄</div>
              <span>E'lon joylash</span>
            </Link>
            <button
              className="action-item logout"
              onClick={() => setlogouts(true)}
            >
              <div className="icon-circle">🚪</div>
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </div>

      {/* DINAMIK RO'YXAT */}
      <div className="user-own-resumes">
        <h3 style={{ textAlign: "center", margin: "20px 0" }}>
          {activeTab === "resumes"
            ? "Mening resumelarim"
            : "Mening buyurtmalarim"}
        </h3>

        {activeTab === "resumes" ? (
          // RESUMELAR RO'YXATI
          myOwnResumes.length > 0 ? (
            myOwnResumes.map((item) => (
              <div className="buyurtmalar" key={item._id}>
                <button
                  onClick={() => handleDeleteResume(item._id)}
                  className="delete-resume-btn"
                >
                  <MdOutlineDeleteOutline />
                </button>
                <div className="user-a">
                  <img src={item.userpic || "/default-user.png"} alt="user" />
                  <div className="about-user">
                    <h2>{item.username || "Foydalanuvchi"}</h2>
                  </div>
                </div>
                <h2 className="buyurtma-discripton">{item.kasb}</h2>
                <p className="buyurtma-title">{item.bio}</p>
                <div
                  className="card-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() =>
                      window.open(`https://t.me/${item.tguser}`, "_blank")
                    }
                    className="buyurtma-javob_btn"
                  >
                    Bog'lanish
                  </button>
                  <div className="crdata">
                    <div className="data">
                      <p>
                        <FaClock className="FaClock" />
                      </p>
                      <span>{formatTime(item.createdAt)}</span>
                    </div>
                    <div className="eye">
                      <IoMdEye />
                      <span>{item.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data-text" style={{ textAlign: "center" }}>
              Sizda hali resumelar mavjud emas.
            </p>
          )
        ) : // BUYURTMALAR RO'YXATI
        myOwnOrders.length > 0 ? (
          myOwnOrders.map((item) => (
            <div className="buyurtmalar" key={item._id}>
              {/* Buyurtmani o'chirish funksiyasi bo'lsa shu yerga tugma qo'shish mumkin */}
              <button
                onClick={() => handleDeleteResume(item._id)}
                className="delete-resume-btn"
              >
                <MdOutlineDeleteOutline />
              </button>
              <div className="user-a">
                <img src={item.creatorpic || "/default-user.png"} alt="user" />
                <div className="about-user">
                  <h2>{item.creator}</h2>
                </div>
              </div>
              <h2 className="buyurtma-discripton">{item.title}</h2>
              <p className="buyurtma-title">{item.description}</p>
              <p className="buyurtma-narxi">{item.budget}</p>
              <div
                className="card-footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() =>
                    window.open(`https://t.me/${item.tguserorder}`, "_blank")
                  }
                  className="buyurtma-javob_btn"
                >
                  Aloqa
                </button>

                <div className="crdata">
                  <div className="data">
                    <p>
                      <FaClock className="FaClock" />
                    </p>
                    <span>{formatTime(item.createdAt)}</span>
                  </div>
                  <div className="eye">
                    <IoMdEye />
                    <span>{item.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-text" style={{ textAlign: "center" }}>
            Sizda hali buyurtmalar mavjud emas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profil;
