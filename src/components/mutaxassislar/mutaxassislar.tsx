import { useEffect, useState } from "react";

// Resume tipini aniqlaymiz
interface Resume {
  _id: string;
  userId: string;
  kasb: string;
  bio: string;
  username?: string;
  soha?: string;
  userpic?: string;
  title?: string;
  narx?: string;
}

function Mutahasislar() {
  const [mutaxassislar, setMutaxassislar] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resume/all");
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik");
        const data = await response.json();
        setMutaxassislar(data.resumes || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Jami buyurtmalar {mutaxassislar.length}
      </h1>
      <div className="buyurtmalarim">
        {mutaxassislar.map((item) => (
          <div className="buyurtmalar" key={item._id}>
            <div className="user-a">
              <img src={item.userpic || ""} alt={item.username || "user"} />
              <div className="about-user">
                <h2>{item.username || "Anonim"}</h2>
                <p>{item.soha || "Soha mavjud emas"}</p>
              </div>
            </div>
            <h2 className="buyurtma-discripton">{item.kasb}</h2>
            <p className="buyurtma-title">{item.bio}</p>
            <button className="buyurtma-javob_btn">Javob berish</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mutahasislar;
