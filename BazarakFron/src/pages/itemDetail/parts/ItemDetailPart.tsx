import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Item = {
  id_item: number;
  created_at: string;
  price: number;
  name: string;
  description: string;
  images: string[];
};


export function ItemDetailPart() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:5000/api/item-detail/${id}`);
      const data = await res.json();
      setItem(data);
    }
    load();
  }, [id]);

  if (!item) return <p>Načítavam...</p>;

  return (
    <div className="container my-4">
    <div className="card shadow p-4">
      <div className="row g-4 align-items-center">

        <div className="col-md-6 order-1 order-md-1">
          <div id="itemCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">

              {item.images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`http://localhost:5000${img}`}
                    className="d-block w-100 rounded"
                    alt={`image ${index}`}
                  />
                </div>
              ))}

            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#itemCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#itemCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        <div className="col-md-6 order-2 order-md-2">
          <h2 className="fw-bold mb-2">{item.name}</h2>

          <p className="text-primary fw-bold fs-3 mb-3">{item.price} €</p>

          <p>{item.description}</p>

          <p className="text-muted mt-3">
            <strong>Pridané: </strong>{new Date(item.created_at).toLocaleDateString("sk-SK")}
          </p>
        </div>

      </div>
    </div>
  </div>
  );
}