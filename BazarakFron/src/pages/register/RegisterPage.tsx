import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function RegisterPage() {
      const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; password2?: string;}>({});

    const navigate = useNavigate();

    function validateForm(){
        const newErrors: {name?: string; email?: string; password?: string; password2?: string;} = {};

        if (!name) {
            newErrors.name = "Meno je povinné";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email je povinný";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email nemá správny formát";
        }

        if (!password) {
            newErrors.password = "Heslo je povinné";
        } else if (password.length < 8) {
            newErrors.password = "Heslo musí mať aspoň 8 znakov";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Heslo musí obsahovať aspoň jedno veľké písmeno";
        }
        else if (!/\d/.test(password)) {
            newErrors.password = "Heslo musí obsahovať aspoň jedno číslo";
        }

        if (!password2) {
            newErrors.password2 = "Potvrdenie hesla je povinné";
        } else if (password !== password2) {
            newErrors.password2 = "Heslá sa nezhodujú";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!validateForm()) return;

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
                        <input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="Zadajte meno" 
                        />
                        {errors.name && <p className='error-text'>{errors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            placeholder="Zadajte email" 
                        />
                        {errors.email && <p className='error-text'>{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Heslo</label>
                        <input 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            placeholder="Zadajte heslo" 
                        />
                        {errors.password && <p className='error-text'>{errors.password}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Potvrďte heslo</label>
                        <input 
                            value={password2} 
                            onChange={e => setPassword2(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            placeholder="Zopakujte heslo" 
                        />
                        {errors.password2 && <p className='error-text'>{errors.password2}</p>}
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