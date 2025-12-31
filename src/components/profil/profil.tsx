import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";

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
  views?: number;
}

function Profil() {
  const navigate = useNavigate();
  const [count, setCount] = useState("0");
  const [buyurtma, setBuyurtma] = useState("0");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [logouts, setlogouts] = useState(false);

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

  // Foydalanuvchilar sonini olish
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch(
          "https://tajriba-a32v.onrender.com/api/user/count"
        );
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCount();
  }, []);

  // Barcha rezyumelarni yuklash
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(
          "https://tajriba-a32v.onrender.com/api/resume/all"
        );
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik");

        const data = await response.json();
        setResumes(data.resumes || []);
      } catch (error) {
        setResumes([]);
      }
    };

    fetchResumes();
  }, []);

  // Buyurtmalar sonini olish
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

  const myOwnResumes = resumes.filter(
    (item) => item.userId === user?.uid || item.userId === user?.userId
  );

  const handleDeleteResume = async (resumeId: string) => {
    if (!window.confirm("Rostdan ham ushbu elonni o‘chirmoqchimisiz?")) return;

    try {
      const response = await fetch(
        `https://tajriba-a32v.onrender.com/api/resume/${resumeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("O‘chirishda xatolik yuz berdi");

      // Local state-ni ham yangilash
      setResumes((prev) => prev.filter((res) => res._id !== resumeId));
    } catch (error) {
      console.error(error);
      toast.error("O‘chirib bo‘lmadi!");
    }
  };

  if (!user) return null;

  return (
    <div>
      <ToastContainer />
      <div className="profil-wrapper">
        {logouts && (
          <div className="overlay">
            <div className="logout-container">
              <h3>Haqiqatdan ham hisobdan chiqmoqchimisiz?</h3>
              <div className="logout-btn">
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={handleLogout}
                >
                  Ha
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => setlogouts(false)}
                >
                  Yo‘q
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="profil-container">
          <div className="user-card">
            <div className="user-avatar-wrapper">
              <img
                src={user.photo || user.photoURL}
                alt="Foydalanuvchi"
                className="user-avatar"
              />
              <div className="status-badge"></div>
            </div>

            <div className="user-info text-center">
              <h2 className="user-name">{user.displayName || user.name}</h2>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          <div>
            {user.email === "tursunboyevakbarali807@gmail.com" ? (
              <div className="main-page_a">
                <div className="user-soni">
                  <p>Azolar</p>
                  <span>{count}</span>
                </div>
                <div className="user-soni">
                  <p> Elonlar</p>
                  <span>{resumes.length}</span>
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

            <button
              className="action-item logout"
              onClick={() => setlogouts(true)}
            >
              <div className="icon-circle">🚪</div>
              <span>Tizimdan chiqish</span>
            </button>
          </div>
        </div>
      </div>
      {/* Foydalanuvchining o'z elonlari ro'yxati */}
      <div className="user-own-resumes">
        {myOwnResumes.length > 0 ? (
          myOwnResumes.map((item) => (
            <div className="buyurtmalar" key={item._id}>
              <button
                onClick={() => handleDeleteResume(item._id)}
                className="delete-resume-btn"
              >
                <MdOutlineDeleteOutline />
              </button>
              <div className="user-a">
                <img
                  src={item.userpic || "/default-user.png"}
                  alt={item.username || "Anonim"}
                />
                <div className="about-user">
                  <h2>{item.username || "Anonim"}</h2>
                </div>
              </div>
              <h2 className="buyurtma-discripton">{item.kasb}</h2>
              <p className="buyurtma-title">{item.bio}</p>

              <button
                onClick={() =>
                  window.open(`https://t.me/${item.tguser}`, "_blank")
                }
                className="buyurtma-javob_btn"
              >
                <p>Javob berish</p>
              </button>
              <div className="my-resumes-views">
                <IoMdEye />
                <span>{item.views || 0}</span>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            Sizda hali elonlar mavjud emas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profil;
