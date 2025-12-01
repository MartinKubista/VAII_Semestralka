import './AddItemPage.css';
import { useAuth } from "../../context/AuthContext";
import { useState} from "react";
import type{ ChangeEvent, FormEvent } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ImagePreview {
  file: File;
  preview: string;
}

export function AddItemPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");

  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<ImagePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const newImages: ImagePreview[] = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id_user = user?.id_user;
    await fetch("http://localhost:5000/api/items/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user ,name, category, description, price, condition, location}),
    });

    
    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img.file);
    });

  /*const response2 = */await fetch("http://localhost:5000/api/items/add-imgs", {
      method: "POST",
      body: formData
  });
   /* const data = await response2.json().catch(() => null);

    console.log("Response status:", response2.status);
    console.log("Response body:", data);
    */
    navigate("/");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="maxWidthContainer container mt-5">
      <div className="card shadow p-4">

        <h3 className="fw-bold mb-3">Pridať nový inzerát</h3>
        <hr className="border-primary mb-4"/>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Názov inzerátu:</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Zadajte názov produktu" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategória:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" required>
              <option value="">-- Vyberte kategóriu --</option>
              <option>Elektronika</option>
              <option>Nábytok</option>
              <option>Oblečenie</option>
              <option>Šport</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Popis:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" rows={4} placeholder="Popíšte svoj inzerát – stav, výhody, príslušenstvo..." required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Cena (€):</label>
            <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" className="form-control" placeholder="Zadajte cenu" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Stav tovaru:</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="form-select" required>
              <option value="">-- Vyberte stav --</option>
              <option>Nové</option>
              <option>Rozbalené</option>
              <option>Použité</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Lokalita:</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="Zadajte mesto alebo okres" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Fotografie:</label>
            <input
            ref={fileInputRef}
            type="file"
            className="d-none"
            multiple
            onChange={handleImagesChange}
          />

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => fileInputRef.current?.click()}>
            Vybrať obrázky
          </button>

          <p className="mt-2">Vybraných obrázkov: {images.length}</p>
          </div>

          {images.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mb-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="position-relative"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img
                    src={img.preview}
                    alt="preview"
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={() => removeImage(index)}
                    style={{ padding: "2px 6px" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-end">
            <button className="btn btn-primary fw-bold" type="submit">
              Pridať inzerát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}