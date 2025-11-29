import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function RegisterPage() {
      const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (password !== password2) {
            alert("Heslá sa nezhodujú!");
            return;
        }

        await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        });

        navigate('/login');
    }

    return (
        <div className="container mt-5 maxWidthContainer" >
            <div className='card p-4 shadow'>
                <h3 className='text-center fw-bold mb-4'>Registrácia</h3>
                <hr className='border-primary lineUnderRegister'/>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Meno</label>
                        <input required value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Zadajte meno" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Zadajte email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Heslo</label>
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Zadajte heslo" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Potvrďte heslo</label>
                        <input required value={password2} onChange={e => setPassword2(e.target.value)} type="password" className="form-control" placeholder="Zopakujte heslo" />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn  btn-success w-20">
                            <span className='fw-bold'>Registrovať</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}