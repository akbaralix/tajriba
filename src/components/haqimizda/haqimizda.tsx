import React from "react";
import "./haqimizda.css";

const AboutSection: React.FC = () => {
  return (
    <section className="about-wrapper">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <span className="badge">Biz Haqimizda</span>
          <h2 className="main-title">
            O'zbekistonning ilk mikro-amaliyot <br /> platformasi bilan
            tanishing
          </h2>
        </div>

        {/* Main Grid */}
        <div className="about-grid">
          {/* Visual Box */}
          <div className="visual-box">
            <div className="blob"></div>
            <div className="image-card">
              <img src="/image-placeholder.png" alt="Bizning platforma rasmi" />
            </div>
          </div>

          {/* Content Box */}
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
                  <h4>Xavfsiz To'lov</h4>
                  <p>
                    Ish qabul qilinmaguncha pulingiz platforma himoyasida
                    bo'ladi.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="stats-panel">
          <div className="stat-card">
            <span className="stat-value">5,000+</span>
            <span className="stat-label">Juniorlar</span>
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
  );
};

export default AboutSection;
