import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/profil");
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      // 🔹 Backendga POST request
      const res = await fetch("https://tajriba-a32v.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const savedUser = await res.json();

      // 🔹 localStoragega saqlash (optional, session uchun)
      localStorage.setItem("userData", JSON.stringify(savedUser));

      navigate("/profil");
    } catch (error) {
      console.error("Google login xatolik:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="dfgh">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Akkuntga kirish
        </h2>
        <div className="malumotlar"></div>

        <div className="login-google" onClick={handleGoogleLogin}>
          <FaGoogle />
          <span>Google orqali kirish</span>
        </div>
      </div>
    </div>
  );
}

export default Login;

