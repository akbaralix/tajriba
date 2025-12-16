import "./home.css";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowCircleRight } from "react-icons/fa";

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
    </div>
  );
}

export default Home;
