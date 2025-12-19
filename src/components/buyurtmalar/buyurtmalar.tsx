import "./buyurtmalar.css";
import { FaTelegram } from "react-icons/fa";
import { useEffect, useState } from "react";

function Buyurtmalar() {
  const [buyurtma, setBuyurtma] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://tajriba-a32v.onrender.com/api/order/all"); // /all endpoint
        const data = await res.json();
        setBuyurtma(data.orders); // backenddan kelayotgan 'orders' property
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      <div className="buyurtmalarim">
        {buyurtma.map((item) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buyurtmalar;

