import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";


export function ChangeProfile() {
  const { token, user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    const trimmedName = name.trim();

    if (!trimmedName) {
      newErrors.name = "Meno je povinné";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Meno musí mať aspoň 2 znaky";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Meno môže mať max. 50 znakov";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/profile/changeProfileData",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) throw new Error();

      setSuccess("Údaje boli úspešne aktualizované");
      setErrors({});
    } catch {
      setErrors({ name: "Zmena mena zlyhala" });
    }
  };

  return (
    <div className="container my-5 maxWidthContainer">
      <div className="card shadow p-4">
        <h3 className="text-center">Zmena údajov</h3>
        <hr className="border-primary mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={user?.email || ""}
              disabled
            />
          </div>

          <div className="form-group  mb-3">
            <label>Meno</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {success && <div className="alert alert-success">{success}</div>}

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Uložiť zmeny
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}