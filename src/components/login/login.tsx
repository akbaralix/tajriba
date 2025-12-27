import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  let isSigningIn = false;

  const handleGoogleLogin = async () => {
    if (isSigningIn) return;
    isSigningIn = true;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      const res = await fetch(
        "https://tajriba-a32v.onrender.com/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!res.ok) {
        throw new Error("Backend xato: " + res.status);
      }

      navigate("/profil");
    } catch (error) {
      console.error(error);
      toast.error("Google orqali kirishda xatolik yuz berdi");
    } finally {
      isSigningIn = false;
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">T.</div>
          <h1>Xush kelibsiz!</h1>
          <p>
            Tajriba.uz platformasiga kirish va o'z faoliyatingizni boshlash
            uchun Google orqali tizimga kiring.
          </p>
        </div>

        <div className="login-body">
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <FaGoogle />
            </div>
            <span>Google orqali davom etish</span>
          </button>
        </div>

        <div className="login-footer">
          <p>
            Kirish orqali siz bizning <span>Foydalanish shartlarimizga</span>{" "}
            rozilik bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
