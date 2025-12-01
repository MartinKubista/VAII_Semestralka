import { useState, useEffect } from "react";

type Item = {
    id_item: number;
  created_at: string;
  price: number;
  name: string;
  description: string;
};

export function ItemPart() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/items/showItems")
        .then((response) => response.json())
        .then((data) => setItems(data));
    }, []);

    return (
         <div className="row g-4">
        {items.map((item) => (
        <div className="col-md-6 col-lg-4 ">
            <div className="card h-100 shadow">
                <img src="https://via.placeholder.com/500x300" className="card-img-top" alt=""/>
                    <div key={item.id_item} className="card-body">
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