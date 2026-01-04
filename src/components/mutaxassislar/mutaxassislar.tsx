import { useEffect, useState, useRef } from "react";
import { FaTelegram, FaSearchengin, FaCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS ni qo'shish kerak bo'lishi mumkin
import "./mutaxassislar.css";

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

function Mutahasislar() {
  const [mutaxassislar, setMutaxassislar] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const activeElementRef = useRef<HTMLDivElement>(null);

  const filteredMutahasislar = mutaxassislar.filter((item) =>
    (item.kasb ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const BOT_TOKEN = "7895195245:AAF-QtBrVuKOYupFieHpqNvfkB4yq62JZMk";
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(
          "https://tajriba-a32v.onrender.com/api/resume/all"
        );
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik");

        const data = await response.json();
        setMutaxassislar(data.resumes || []);

        // Serverga ko'rishlar sonini yuborish (bu joyi o'zgartirilmadi)
        if (data.resumes && data.resumes.length > 0) {
          await Promise.all(
            data.resumes.map((resume: Resume) =>
              fetch(
                `https://tajriba-a32v.onrender.com/api/resume/${resume._id}`
              )
            )
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setMutaxassislar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // ULASHISH FUNKSIYASI
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

  // TASHQARIGA BOSGANDA MENU/REPORTNI YOPISH
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Agar menyu yoki report ochiq bo'lsa va bosilgan joy ref ichida bo'lmasa
      if (
        activeElementRef.current &&
        !activeElementRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
        setReport(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId, report]);

  // SHIKOYAT YUBORISH
  const handleReportSubmit = (text: string) => {
    BOT_TOKEN &&
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
    toast.info("Shikoyatingiz qabul qilindi. Tez orada ko'rib chiqamiz.");
    setReport(null); // Oynani yopish
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
            <h2 className="loader-text"></h2>
            <p className=" loader-text"></p>
            <button className="loader-btn"></button>
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

  if (mutaxassislar.length === 0) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "50px", color: "White" }}>
        Hozircha mutahasislar mavjud emas!
      </h3>
    );
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="search">
        <input
          type="search"
          placeholder="Qidiring"
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);

            if (value.trim() === "") {
              setSearchQuery("");
              setHasSearched(false);
            }
          }}
        />

        <button
          onClick={() => {
            setSearchQuery(inputValue);
            setHasSearched(true);
          }}
        >
          <FaSearchengin />
        </button>
      </div>
      {hasSearched && filteredMutahasislar.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20, color: "white" }}>
          🔍 Hech narsa topilmadi
        </p>
      )}

      <div className="buyurtmalarim">
        {filteredMutahasislar.map((item) => (
          <div className="buyurtmalar" key={item._id}>
            {/* 3 nuqta menyusi ochish tugmasi */}
            <div className="open-main_menu">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Bubblingni to'xtatish
                  if (openMenuId === item._id) {
                    setOpenMenuId(null);
                  } else {
                    setOpenMenuId(item._id);
                    setReport(null); // Boshqa narsa ochiq bo'lsa yopish
                  }
                }}
              >
                <BsThreeDotsVertical />
              </button>
            </div>

            {/* Ochiladigan Menyu */}
            {openMenuId === item._id && (
              <div className="menu-actions" ref={activeElementRef}>
                <div className="send-btn">
                  <button onClick={() => handleShare(item._id)}>
                    <LuSend />
                    <span>Ulashish</span>
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
                    <span>Nusxalash</span>
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
                    <span>Shikoyat qilish</span>
                  </button>
                </div>
              </div>
            )}

            {/* Shikoyat oynasi */}
            <div className="report-actions">
              {report === item._id && (
                <div className="report-form" ref={activeElementRef}>
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
                    onClick={() => setReport(null)}
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
                  >
                    Yopish
                  </button>
                </div>
              )}
            </div>

            <a
              href={`/resume/${item._id}`}
              key={item._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="user-a">
                <img
                  src={item.userpic || "/default-user.png"}
                  alt={item.username || "Anonim"}
                />
                <div className="about-user">
                  <h2>{item.username || "Anonim"}</h2>
                  <p>{item.soha || "Mutahassis"}</p>
                </div>
              </div>
              <h2 className="buyurtma-discripton">{item.kasb}</h2>
              <p className="buyurtma-title">{item.bio}</p>
            </a>

            <button
              onClick={() => {
                window.open(`https://t.me/${item.tguser}`, "_blank");
              }}
              className="buyurtma-javob_btn"
            >
              <FaTelegram /> <p>Javob berish</p>
            </button>
            <div className="buyurtma-actions">
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

export default Mutahasislar;
