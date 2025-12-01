import { useState, useEffect } from "react";

type Item = {
  id_item: number;
  created_at: string;
  price: number;
  name: string;
  description: string;
  image: string;
};

export function ItemPart() {
    const [items, setItems] = useState<Item[]>([]);

useEffect(() => {
    async function loadItems() {
        try {
            const response = await fetch("http://localhost:5000/api/items/showItems");

            // bezpečné prečítanie tela
            const data = await response.json().catch(() => null);

            console.log("Response status:", response.status);
            console.log("Response body:", data);

            setItems(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    loadItems();
}, []);

    return (
         <div className="row g-4">
        {items.map((item) => (
        <div key={item.id_item} className="col-md-6 col-lg-4 ">
            <div className="card h-100 shadow">
                <img src={`http://localhost:5000${item.image}`} className="card-img-top" alt=""/>
                    <div  className="card-body">
                            <h5 className="card-title">{item.name}</h5>

                            <p className="text-success fw-bold fs-5">
                                {item.price} €
                            </p>

                            <p className="text-muted mb-1">
                                Pridané: {new Date(item.created_at).toLocaleDateString("sk-SK")}
                            </p>

                            <p>{item.description}</p>
                    </div>

            </div>
        </div>
        ))}
    </div>
    );
}