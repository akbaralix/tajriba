import "./home.css";
import { Link } from "react-router-dom";
import { FaSearch, FaCode, FaPaintBrush, FaRocket } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

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
        </div>
      </section>
    </div>
  );
}

export default Home;
