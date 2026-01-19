import React, { useState } from "react";
import "./ChangePasswordPage.css"
import { useAuth } from "../../context/useAuth";

export function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState("");

  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const validateForm = () => {
    const newErrors: {
      oldPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    const oldPwd = oldPassword.trim();
    const newPwd = newPassword.trim();
    const confirmPwd = confirmPassword.trim();

    if (!oldPwd) {
      newErrors.oldPassword = "Aktuálne heslo je povinné";
    }

    if (!newPwd) {
      newErrors.newPassword = "Nové heslo je povinné";
    } else if (newPwd.length < 8) {
      newErrors.newPassword = "Heslo musí mať aspoň 8 znakov";
    } else if (!/[A-Z]/.test(newPwd)) {
      newErrors.newPassword = "Heslo musí obsahovať veľké písmeno";
    } else if (!/\d/.test(newPwd)) {
      newErrors.newPassword = "Heslo musí obsahovať číslo";
    } else if (newPwd.length > 72) {
      newErrors.newPassword = "Heslo môže mať max. 72 znakov";
    }

    if (!confirmPwd) {
      newErrors.confirmPassword = "Potvrdenie hesla je povinné";
    } else if (newPwd !== confirmPwd) {
      newErrors.confirmPassword = "Heslá sa nezhodujú";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



    try {

        e.preventDefault();
        setSuccess("");

        if (!validateForm()) return;
        const res = await fetch("http://localhost:5000/api/profile/changePassword", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
             },
            credentials: "include",
            body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
        });

        if (!res.ok) throw new Error("Zmena hesla zlyhala");

        setSuccess("Heslo bolo úspešne zmenené");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
    } catch {
        setErrors({ oldPassword: "Nesprávne aktuálne heslo" });
    }
  };

  return (
    <div className="container my-5 maxWidthContainer">
        <div className="card shadow p-4">
        <h3 className="text-center">Zmena hesla</h3>
        <hr className="border-primary mb-4"/>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Aktuálne heslo</label>
                <input
                type="password"
                className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                />
                {errors.oldPassword && (
                <div className="invalid-feedback">{errors.oldPassword}</div>
                )}
            </div>

            <div className="form-group">
                <label>Nové heslo</label>
                <input
                type="password"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
                )}
            </div>

            <div className="form-group mb-3">
                <label>Potvrdiť nové heslo</label>
                <input
                type="password"
                className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                <div className="invalid-feedback">
                    {errors.confirmPassword}
                </div>
                )}
            </div>

            {success && <div className="alert alert-success">{success}</div>}
            
            <div className="text-center">
                <button type="submit" className="btn btn-primary">
                    Zmeniť heslo
                </button>
            </div>

            </form>
        </div>
    </div>
  );
}