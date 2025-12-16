import "./create.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Create() {
  const [kasb, setKasb] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const handlecreate = async () => {
    if (kasb === "" || bio === "") {
      alert("Barcha maydonlarni to'ldiring");
      return;
    }

    try {
      const userData = localStorage.getItem("userData");
      const user = userData ? JSON.parse(userData) : null;
      if (!user) {
        navigate("/login");
        return;
      }
      const response = await fetch("https://tajriba-a32v.onrender.com/api/resume/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          kasb,
          bio,
          username: user.displayName,
          userpic: user.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xatolik yuz berdi");
      }

      const data = await response.json();
      alert(data.message); // Resume saqlandi
      setKasb("");
      setBio("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="resume">
      <h2>Rezume yaratish</h2>
      <div className="resume-input">
        <input
          value={kasb}
          maxLength={20}
          onChange={(e) => setKasb(e.target.value)}
          id="text"
          type="text"
          placeholder="Kasibingiz"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          name="bio"
        ></textarea>
        <button onClick={handlecreate}>Yaratish</button>
      </div>
    </div>
  );
}

export default Create;

