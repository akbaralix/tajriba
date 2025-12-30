import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTelegram, FaArrowLeft, FaMoneyBillWave } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

interface Order {
  _id: string;
  creator: string;
  creatorpic?: string;
  title: string;
  description: string;
  budget: string;
  tguserorder: string;
  views?: number;
}

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (hasCalledAPI.current) return;

    const getOrderData = async () => {
      try {
        hasCalledAPI.current = true;
        const storageKey = `viewed_order_${id}`;
        const isViewed = localStorage.getItem(storageKey);

        // MUHIM: /api/resume/ emas, /api/order/ bo'lishi shart!
        let url = `https://tajriba-a32v.onrender.com/api/order/${id}`;

        if (!isViewed) {
          url += "?increment=true";
        }

        const response = await fetch(url);

        // Agar 404 bersa, demak backendda ushbu ID bilan order yo'q
        if (!response.ok) throw new Error("Buyurtma topilmadi");

        const data = await response.json();

        // Backend bitta obyekt qaytaradi deb hisoblaymiz
        setOrder(data);

        if (!isViewed && response.ok) {
          localStorage.setItem(storageKey, "true");
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, [id]);

  if (loading) return <div className="loader-center">Yuklanmoqda...</div>;
  if (!order) return <div className="loader-center">Buyurtma topilmadi!</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate("/buyurtmalar")}>
        <FaArrowLeft /> Orqaga
      </button>

      <div className="resume-card-detail">
        <div className="detail-header">
          <img
            src={order.creatorpic || "/user.png"}
            alt={order.creator}
            className="detail-img"
          />
          <div className="detail-info">
            <h1>{order.creator}</h1>
            <p className="detail-soha">Buyurtmachi</p>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="detail-kasb">{order.title}</h2>
          <p className="detail-bio">{order.description}</p>

          <div
            className="budget-box"
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "rgba(76, 175, 80, 0.15)",
              borderRadius: "10px",
              color: "#4caf50",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(76, 175, 80, 0.3)",
            }}
          >
            <FaMoneyBillWave size={20} />
            <span>
              Byudjet: <strong>{order.budget}</strong>
            </span>
          </div>
        </div>

        <div className="detail-footer">
          <div className="detail-views">
            <IoMdEye /> <span>{order.views || 0} marta ko'rildi</span>
          </div>

          <button
            className="detail-tg-btn"
            onClick={() => {
              const tg = order.tguserorder?.replace("@", "");
              window.open(`https://t.me/${tg}`, "_blank");
            }}
          >
            <FaTelegram /> <span>Bog'lanish</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;


