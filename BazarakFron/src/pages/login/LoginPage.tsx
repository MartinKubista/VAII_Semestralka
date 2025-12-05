import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string, password?:string}>({});
  const navigate = useNavigate();
  const { login } = useAuth();


  function validateForm() {
  const newErrors: { email?: string; password?: string } = {};

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail) {
    newErrors.email = "Email je povinný";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Email nemá správny formát";
    } else if (trimmedEmail.length > 50) {
      newErrors.email = "Email môže obsahovať maximálne 50 znakov";
    }
  }

  if (!trimmedPassword) {
    newErrors.password = "Heslo je povinné";
  } else if (trimmedPassword.length > 72) {
    newErrors.password = "Heslo môže obsahovať maximálne 72 znakov";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) return;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Nesprávny email alebo heslo");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    login(data.token);
    navigate("/");
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3 className="login-title">Prihlásenie</h3>
        <div className="login-underline"></div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Zadajte email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Heslo</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Zadajte heslo"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Prihlásiť
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}