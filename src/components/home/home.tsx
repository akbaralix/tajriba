import "./home.css";
import { Link } from "react-router-dom";
import { FaSearch, FaCode, FaPaintBrush, FaRocket } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

import placholderImg from "../../../public/image placholder.png";

function Home() {
  return (
    <div>
      <div className="header-main_content">
        <div className="header-main_content_title">
          <h1>
            Portfolio yig‘ing. Tajriba orttiring. Birinchi pulingizni toping.
          </h1>
        </div>
        <div className="header-main_paragraph">
          <p>
            Tajriba.uz — bu junior mutaxassislar va kichik bizneslarni
            bog‘lovchi platforma. Hoziroq boshlang!
          </p>
        </div>
        <div className="header-main_button">
          <Link to="/buyurtmalar" className="btn btn--primary">
            Ish topish
            <FaSearch />
          </Link>
          <Link to="/mutaxassislar" className="btn btn--secondary">
            Mutaxassis topish
            <FaArrowCircleRight />
          </Link>
        </div>
      </div>
      <section className="about-wrapper">
        <div className="about-container">
          <div className="about-header">
            <br />
            <h2 className="main-title">
              <span style={{ color: "#614afaff" }}>Tajriba</span> platformasi
              bilan tanishing
            </h2>
            <p className="main-title_text">
              Ko‘plab yosh mutaxassislar o‘quv kurslarini tamomlagandan so‘ng
              bir xil yopiq doira ichida qolib ketishadi. Ishga kirish uchun
              tajriba kerak, tajriba orttirish uchun esa ishga kirish kerak.
              Ushbu dolzarb muammoga yechim sifatida yangi "Tajriba" platformasi
              ishga tushirildi.
            </p>
          </div>

          <div className="about-grid">
            <div className="visual-box">
              <div className="image-card">
                <img src={placholderImg} alt="Bizning platforma rasmi" />
              </div>
            </div>

            <div className="content-box">
              <ul className="values-list">
                <li className="value-item">
                  <div className="icon-box">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="value-text">
                    <h4>Tezkor Start</h4>
                    <p>
                      O'quv kursini bitirganingizdan so'ng, kutishlarsiz real
                      loyihalarda qatnashing.
                    </p>
                  </div>
                </li>

                <li className="value-item">
                  <div className="icon-box">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="value-text">
                    <h4>Xavfsiz Aloqa</h4>
                    <p>
                      Ish beruvchi yoki mutahassis bilan{" "}
                      <span style={{ color: "#088efcff" }}>Telegram</span> da
                      Xavfsiz aloqa qiling.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Ommabop yo'nalishlar</h2>
          <div className="categories-grid">
            <div className="category-card">
              <FaCode className="cat-icon" />
              <h4>Dasturlash</h4>
              <p>Saytlar va botlar yaratish</p>
            </div>
            <div className="category-card">
              <FaPaintBrush className="cat-icon" />
              <h4>Dizayn</h4>
              <p>Logo va SMM postlar</p>
            </div>
            <div className="category-card">
              <FaRocket className="cat-icon" />
              <h4>Marketing</h4>
              <p>Target va reklama</p>
            </div>
          </div>
          <div className="stats-panel">
            <div className="stat-card">
              <span className="stat-value">5,000+</span>
              <span className="stat-label">Foydalanuvchi</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">1,200+</span>
              <span className="stat-label">Loyihalar</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">Kafolat</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
