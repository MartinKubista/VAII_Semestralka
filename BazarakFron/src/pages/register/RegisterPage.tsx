import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const navigate = useNavigate();
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
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
                        <input type="text" className="form-control" placeholder="Zadajte meno" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Zadajte email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Heslo</label>
                        <input type="password" className="form-control" placeholder="Zadajte heslo" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Potvrďte heslo</label>
                        <input type="password" className="form-control" placeholder="Zopakujte heslo" />
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