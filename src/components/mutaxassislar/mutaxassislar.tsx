import { useEffect, useState } from "react";
import "./mutaxassislar.css";
import { FaTelegram } from "react-icons/fa6";

interface Resume {
  _id: string;
  userId: string;
  kasb: string;
  bio: string;
  tguser: string;
  username?: string;
  soha?: string;
  userpic?: string;
}

function Mutahasislar() {
  const [mutaxassislar, setMutaxassislar] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resume/all");
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik");

        const data = await response.json();
        setMutaxassislar(data.resumes || []);
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
      <div className="buyurtmalarim">
        {mutaxassislar.map((item) => (
          <div className="buyurtmalar" key={item._id}>
            <div className="user-a">
              <img
                src={item.userpic || "/default-user.png"}
                alt={item.username || "Anonim"}
              />
              <div className="about-user">
                <h2>{item.username || "Anonim"}</h2>
                <p>{item.soha || "Soha mavjud emas"}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mutahasislar;
