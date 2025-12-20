import "./create.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [activeTab, setActiveTab] = useState("resume");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    kasb: "",
    bio: "",
    tguser: "",
  });

  const [orderData, setOrderData] = useState({
    title: "",
    description: "",
    budget: "",
    tguserorder: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) navigate("/login");
  }, [navigate]);

  const handleTgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setResumeData({ ...resumeData, tguser: val });
  };

  const handleTgChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setOrderData({ ...orderData, tguserorder: val });
  };
  const handleAction = async (type: "resume" | "order") => {
    const userData = JSON.parse(localStorage.getItem("userData")!);

    if (type === "resume") {
      if (!resumeData.kasb || !resumeData.bio || !resumeData.tguser) {
        toast.error("Iltimos, rezume uchun barcha maydonlarni to‘ldiring!");
        return;
      }
    }

    if (type === "order") {
      if (!orderData.title || !orderData.description || !orderData.budget) {
        toast.error("Iltimos, buyurtma uchun barcha maydonlarni to‘ldiring!");
        return;
      }
    }

    setLoading(true);

    const endpoint =
      type === "resume" ? "/api/resume/create" : "/api/order/create";

    const bodyData =
      type === "resume"
        ? {
            ...resumeData,
            userId: userData.uid,
            username: userData.name,
            userpic: userData.photo,
          }
        : {
            ...orderData,
            userId: userData.uid,
            creator: userData.name,
            creatorpic: userData.photo,
            budget: orderData.budget,
            tguserorder: orderData.tguserorder,
          };

    try {
      const response = await fetch(
        `https://tajriba-a32v.onrender.com${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.ok) {
        toast.success(
          type === "resume" ? "Rezume yaratildi!" : "Buyurtma e'lon qilindi!"
        );

        type === "resume"
          ? setResumeData({ kasb: "", bio: "", tguser: "" })
          : setOrderData({
              title: "",
              description: "",
              budget: "",
              tguserorder: "",
            });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <ToastContainer />
      <div className="tab-switcher">
        <button
          className={activeTab === "resume" ? "active" : ""}
          onClick={() => setActiveTab("resume")}
        >
          Rezume yaratish
        </button>
        <button
          className={activeTab === "order" ? "active" : ""}
          onClick={() => setActiveTab("order")}
        >
          Buyurtma berish
        </button>
      </div>

      <div className="form-card">
        {activeTab === "resume" ? (
          <div className="form-content">
            <h2 style={{ color: "white", textAlign: "center" }}>
              Rezume ma'lumotlari
            </h2>
            <div className="input-group">
              <label>Mutaxassislik</label>
              <input
                type="text"
                placeholder="Masalan: Grafika dizayneri"
                maxLength={25}
                value={resumeData.kasb}
                onChange={(e) =>
                  setResumeData({ ...resumeData, kasb: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>O'zingiz haqida</label>
              <textarea
                placeholder="Tajribangizni tariflang..."
                maxLength={600}
                value={resumeData.bio}
                onChange={(e) =>
                  setResumeData({ ...resumeData, bio: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Telegram Username</label>
              <input
                type="text"
                placeholder="user_name"
                maxLength={32}
                value={resumeData.tguser}
                onChange={handleTgChange}
              />
            </div>
            <button
              className="submit-btn"
              onClick={() => handleAction("resume")}
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "Rezumeni saqlash"}
            </button>
          </div>
        ) : (
          <div className="form-content">
            <h2 style={{ color: "white", textAlign: "center" }}>
              Loyiha tafsilotlari
            </h2>
            <div className="input-group">
              <label>Loyiha nomi</label>
              <input
                type="text"
                placeholder="Masalan: Web sayt tayyorlash"
                maxLength={40}
                value={orderData.title}
                onChange={(e) =>
                  setOrderData({ ...orderData, title: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Batafsil ma'lumot</label>
              <textarea
                placeholder="Loyiha talablarini yozing..."
                value={orderData.description}
                onChange={(e) =>
                  setOrderData({ ...orderData, description: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Budjet ($ yoki so'm)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Masalan: 500$"
                maxLength={10}
                value={orderData.budget}
                onChange={(e) =>
                  setOrderData({ ...orderData, budget: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Telegram Username</label>
              <input
                type="text"
                placeholder="user_name"
                maxLength={32}
                value={orderData.tguserorder}
                onChange={handleTgChangeOrder}
              />
            </div>
            <button
              className="submit-btn order-theme"
              onClick={() => handleAction("order")}
              disabled={loading}
            >
              {loading ? "Yuborilmoqda..." : "Buyurtmani e'lon qilish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
