import "./buyurtmalar.css";
import { FaTelegram, FaClock, FaSearchengin } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { FaCopy } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

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

interface UserType {
  name: string;
}

function Buyurtmalar() {
  const [buyurtma, setBuyurtma] = useState<BuyurtmaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const user: UserType = JSON.parse(
    localStorage.getItem("userData") || '{"name": "Foydalanuvchi"}'
  );

  const BOT_TOKEN = "7895195245:AAF-QtBrVuKOYupFieHpqNvfkB4yq62JZMk";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://tajriba-a32v.onrender.com/api/order/all"
        );
        const data = await res.json();
        setBuyurtma(data.orders || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const target = event.target as HTMLElement;

        if (
          !target.closest(".menu-actions") &&
          !target.closest(".open-main_menu")
        ) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  // SHIKOYAT YUBORISH
  const handleReportSubmit = (text: string) => {
    if (BOT_TOKEN) {
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "907402803",
          parse_mode: "HTML",
          text: `Shikoyat turi: ${text}\n\nYuboruvchi: ${user.name}\nResume ID: ${report}`,
        }),
      });
    }
    toast.info("Shikoyatingiz qabul qilindi. Tez orada ko'rib chiqamiz.");
    setReport(null);
  };

  const handleShare = async (id: string) => {
    const shareUrl = `${window.location.origin}/resume/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mutahassis Tavsifi",
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share error:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Havola nusxalandi!");
      } catch (err) {
        console.error("Copy error:", err);
        toast.error("Nusxalashda xatolik");
      }
    }
    setOpenMenuId(null); // Ulashgandan keyin menyuni yopish
  };

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
            <hr
              style={{
                marginTop: 12,
                border: "none",
                height: "1px",
                width: "100%",
                backgroundColor: "#444",
              }}
            />
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
      <ToastContainer />
      <div className="search">
        <input type="search" placeholder="Qidiring" />
        <button>
          <FaSearchengin />
        </button>
      </div>

      <div className="buyurtmalarim">
        {buyurtma.map((item) => (
          <div
            className="buyurtmalar"
            key={item._id}
            style={{ position: "relative" }}
          >
            {/* 3 nuqta menyusi ochish tugmasi */}
            <div
              className="open-main_menu"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Bubblingni to'xtatish
                  if (openMenuId === item._id) {
                    setOpenMenuId(null);
                  } else {
                    setOpenMenuId(item._id);
                    setReport(null); // Boshqa narsa ochiq bo'lsa yopish
                  }
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                <BsThreeDotsVertical />
              </button>
            </div>

            {/* Ochiladigan Menyu */}
            {openMenuId === item._id && (
              <div className="menu-actions">
                <div className="send-btn">
                  <button onClick={() => handleShare(item._id)}>
                    <LuSend />
                    <span style={{ marginLeft: "5px" }}>Ulashish</span>
                  </button>
                </div>
                <div className="copy-btn">
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/resume/${item._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Havola nusxalandi");
                      setOpenMenuId(null);
                    }}
                  >
                    <FaCopy />
                    <span style={{ marginLeft: "5px" }}>Nusxalash</span>
                  </button>
                </div>
                <div className="report">
                  <button
                    onClick={() => {
                      setReport(item._id); // Reportni ochish
                      setOpenMenuId(null); // Menyuni yopish
                    }}
                  >
                    <MdOutlineReport />
                    <span style={{ marginLeft: "5px" }}>Shikoyat qilish</span>
                  </button>
                </div>
              </div>
            )}

            {/* Shikoyat oynasi */}
            {report === item._id && (
              <div className="report-actions">
                <div className="report-form">
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("Noqonuniy kontent")}
                  >
                    <p>Noqonuniy kontentdan foydalanilgan</p>
                  </div>
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("18+ kontent")}
                  >
                    <p>18+ kontentdan foydalanilgan</p>
                  </div>
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("Spam")}
                  >
                    <p>Spam yoki aldayotgan kontent</p>
                  </div>
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("Shaxsiy ma'lumot")}
                  >
                    <p>Shaxsiy ma'lumotlarni oshkor qilish</p>
                  </div>
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("Zo'ravonlik")}
                  >
                    <p>Jinsiy yoki zo‘ravonlik kontenti</p>
                  </div>
                  <div
                    className="reports-text"
                    onClick={() => handleReportSubmit("Soxtalashtirish")}
                  >
                    <p>Noto‘g‘ri ma’lumotlar yoki soxtalashtirish</p>
                  </div>
                  <button
                    style={{
                      width: "50%",
                      marginTop: "10px",
                      background: "#5689d5be",
                      fontSize: 16,
                      fontWeight: "700",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setReport(null)}
                  >
                    Yopish
                  </button>
                </div>
              </div>
            )}

            {/* Asosiy Karta Kontenti */}
            <a
              href={`/order/${item._id}`}
              style={{
                textDecoration: "none",
                display: "block",
                color: "inherit",
              }}
            >
              <div className="user-a">
                <img src={item.creatorpic || "/user.png"} alt="" />
                <div className="about-user">
                  <h2>{item.creator}</h2>
                  <p>Buyurtmachi</p>
                </div>
              </div>

              <h2 className="buyurtma-discripton">{item.title}</h2>
              <p className="buyurtma-title">{item.description}</p>
            </a>

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
              </div>
              <div className="eye">
                <IoMdEye />
                <span>{item.views || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buyurtmalar;
