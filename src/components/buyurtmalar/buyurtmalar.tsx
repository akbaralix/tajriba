import "./buyurtmalar.css";
import { FaTelegram, FaClock, FaSearchengin } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import { useEffect, useState } from "react";

interface BuyurtmaType {
  _id: string;
  creator: string;
  creatorpic?: string;
  title: string;
  description: string;
  budget: string;
  tguserorder?: string;
  createdAt: string;
  views?: number;
}

function Buyurtmalar() {
  const [buyurtma, setBuyurtma] = useState<BuyurtmaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://tajriba-a32v.onrender.com/api/order/all"
        );
        const data = await res.json();
        setBuyurtma(data.orders);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const formatTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);

    if (diffSec < 60) return `${diffSec}s`;
    if (diffMin < 60) return `${diffMin}m`;
    if (diffHour < 24) return `${diffHour}h`;
    if (diffDay < 7) return `${diffDay}d`;
    return `${diffWeek}w`;
  };
  if (loading) {
    return (
      <div className="buyurtmalarim">
        {[1, 2, 3].map((i) => (
          <div className="buyurtmalar-loader" key={i}>
            <div className="user-a">
              <div className="loader-img"></div>
              <div className="about-user-loader">
                <h2 className="loader-text"></h2>
                <p className="loader-text"></p>
              </div>
            </div>
            <div className="buyurtma-narx-loader"></div>
            <h2 className="loader-text"></h2>
            <p className=" loader-text"></p>
            <button className="loader-buyurtma-btn"></button>
          </div>
        ))}
      </div>
    );
  }

  if (buyurtma.length === 0) {
    return (
      <h3 style={{ textAlign: "center", color: "red", marginTop: 50 }}>
        Buyurtmalar mavjud emas !
      </h3>
    );
  }

  return (
    <div>
      <div className="search">
        <input type="search" placeholder="Qidiring" />

        <button>
          <FaSearchengin />
        </button>
      </div>
      <div className="buyurtmalarim">
        {buyurtma.map((item) => (
          <a
            href={`/order/${item._id}`}
            key={item._id}
            style={{ textDecoration: "none" }}
          >
            <div className="buyurtmalar" key={item._id}>
              <div className="user-a">
                <img src={item.creatorpic || "/user.png"} alt="" />
                <div className="about-user">
                  <h2>{item.creator}</h2>
                  <p>Buyurtmachi</p>
                </div>
              </div>

              <h2 className="buyurtma-discripton">{item.title}</h2>

              <p className="buyurtma-title">{item.description}</p>

              <p className="buyurtma-narx">{item.budget}</p>

              <a
                href={`https://t.me/${item.tguserorder || ""}`}
                target="_blank"
                rel="noreferrer"
                className="buyurtma-javob_btn"
              >
                <FaTelegram />
                <p>Javob berish</p>
              </a>
              <div className="crdata">
                <div className="data">
                  <p>
                    <FaClock className="FaClock" />
                  </p>
                  <span>{formatTime(item.createdAt)}</span>
                </div>{" "}
                <div className="eye">
                  <IoMdEye />
                  <span>{item.views || 0}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Buyurtmalar;
