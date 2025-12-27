import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTelegram, FaArrowLeft } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import "./resume.css";

interface Resume {
  _id: string;
  kasb: string;
  bio: string;
  tguser: string;
  username?: string;
  soha?: string;
  userpic?: string;
  views?: number;
}

function ResumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (hasCalledAPI.current) return;

    const getResumeData = async () => {
      try {
        hasCalledAPI.current = true;

        const storageKey = `viewed_resume_${id}`;
        const isViewed = localStorage.getItem(storageKey);

        // MUHIM: Har doim bitta bazaviy URL dan foydalanamiz
        // Faqat ko'rilmagan bo'lsa oxiriga ?increment=true qo'shamiz
        let url = `https://tajriba-a32v.onrender.com/api/resume/${id}`;
        if (!isViewed) {
          url += "?increment=true";
        }

        const response = await fetch(url);

        if (!response.ok) throw new Error("Serverdan xato javob keldi");

        const data = await response.json();
        setResume(data);

        // Agar ko'rish oshirilgan bo'lsa (yoki birinchi marta bo'lsa) belgi qo'yamiz
        if (!isViewed && response.ok) {
          localStorage.setItem(storageKey, "true");
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    getResumeData();
  }, [id]);

  if (loading) return <div className="loader-center">Yuklanmoqda...</div>;
  if (!resume) return <div className="loader-center">Ma'lumot topilmadi!</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Orqaga
      </button>

      <div className="resume-card-detail">
        <div className="detail-header">
          <img
            src={resume.userpic || "/default-user.png"}
            alt={resume.username || "User"}
            className="detail-img"
          />
          <div className="detail-info">
            <h1>{resume.username || "Anonim"}</h1>
            <p className="detail-soha">{resume.soha || "Mutaxassis"}</p>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="detail-kasb">{resume.kasb}</h2>
          <p className="detail-bio">{resume.bio}</p>
        </div>

        <div className="detail-footer">
          <div className="detail-views">
            <IoMdEye /> <span>{resume.views || 0} marta ko'rildi</span>
          </div>

          <button
            className="detail-tg-btn"
            onClick={() =>
              window.open(`https://t.me/${resume.tguser}`, "_blank")
            }
          >
            <FaTelegram /> Telegram orqali bog'lanish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetail;
