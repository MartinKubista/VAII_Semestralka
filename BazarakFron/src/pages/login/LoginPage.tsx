import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LoginPage() {
      const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
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
        
        navigate('/');
    };

    return (
    <div className="maxWidthContainer container mt-5" style={{ maxWidth: "500px" }}>
        <div className="card shadow p-4">
            <h3 className="text-center fw-bold mb-4">Prihlásenie</h3>
            <hr className="lineUnderLogin border-primary"/>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Zadajte email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Heslo</label>
                    <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Zadajte heslo" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success w-20">
                    <span className="fw-bold">Prihlásiť</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}