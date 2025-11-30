import './AddItemPage.css';
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AddItemPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Počas redirectu nech nič nerenderuje
  if (!isLoggedIn) return null;

  return (
    <div className="maxWidthContainer container mt-5">
      <div className="card shadow p-4">

        <h3 className="fw-bold mb-3">Pridať nový inzerát</h3>
        <hr className="border-primary mb-4"/>

        <form>
          <div className="mb-3">
            <label className="form-label">Názov inzerátu:</label>
            <input type="text" className="form-control" placeholder="Zadajte názov produktu" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategória:</label>
            <select className="form-select" required>
              <option value="">-- Vyberte kategóriu --</option>
              <option>Elektronika</option>
              <option>Nábytok</option>
              <option>Oblečenie</option>
              <option>Šport</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Popis:</label>
            <textarea className="form-control" rows={4} placeholder="Popíšte svoj inzerát – stav, výhody, príslušenstvo..." required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Cena (€):</label>
            <input type="number" className="form-control" placeholder="Zadajte cenu" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Stav tovaru:</label>
            <select className="form-select" required>
              <option value="">-- Vyberte stav --</option>
              <option>Nové</option>
              <option>Rozbalené</option>
              <option>Použité</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Lokalita:</label>
            <input type="text" className="form-control" placeholder="Zadajte mesto alebo okres" required />
          </div>

          <div className="mb-4">
            <label className="form-label">Fotografia:</label>
            <input type="file" className="form-control" required />
          </div>

          <div className="text-end">
            <button className="btn btn-primary fw-bold">
              Pridať inzerát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}