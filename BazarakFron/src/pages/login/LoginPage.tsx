import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
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
                    <input required type="email" className="form-control" placeholder="Zadajte email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Heslo</label>
                    <input required type="password" className="form-control" placeholder="Zadajte heslo" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success w-20">
                    <span className="fw-bold">Prihlásiť sa</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}