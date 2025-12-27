import { useEffect, useState } from "react";
import "./mutaxassislar.css";
import { FaTelegram, FaSearchengin } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { LuSend } from "react-icons/lu";

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

function Mutahasislar() {
  const [mutaxassislar, setMutaxassislar] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredMutahasislar = mutaxassislar.filter((item) =>
    (item.kasb ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(
          "https://tajriba-a32v.onrender.com/api/resume/all"
        );
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik");

        const data = await response.json();
        setMutaxassislar(data.resumes || []);

        // Har bir resume uchun view oshirish
        await Promise.all(
          data.resumes.map((resume: Resume) =>
            fetch(`https://tajriba-a32v.onrender.com/api/resume/${resume._id}`)
          )
        );
      } catch (error) {
        console.error("Fetch error:", error);
        setMutaxassislar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
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
            <h2 className="loader-text"></h2>
            <p className=" loader-text"></p>
            <button className="loader-btn"></button>
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
        <p style={{ textAlign: "center", marginTop: 20 }}>
          🔍 Hech narsa topilmadi
        </p>
      )}

      <div className="buyurtmalarim">
        {filteredMutahasislar.map((item) => (
          <div className="buyurtmalar" key={item._id}>
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

            <button
              onClick={() =>
                window.open(`https://t.me/${item.tguser}`, "_blank")
              }
              className="buyurtma-javob_btn"
            >
              <FaTelegram /> <p>Javob berish</p>
            </button>
            <div className="buyurtma-actions">
              <div className="eye">
                <IoMdEye />
                <span>{item.views || 0}</span>
              </div>
              <div className="sen">
                <button>
                  <LuSend />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mutahasislar;
