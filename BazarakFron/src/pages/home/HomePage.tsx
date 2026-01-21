import { useState, useEffect } from "react";
import {ItemPart} from "./parts/ItemPart";
import {SearchPart} from "./parts/SearchPart";

type Item = {
  id_item: number;
  username: string;
  created_at: string;
  price: number;
  name: string;
  description: string;
  image: string;
  category: string;
  condition: string;
};

export function HomePage() {
    const [filters, setFilters] = useState({
        query: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        location: "",
        added: ""
    });

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function loadItems() {
            const params = new URLSearchParams(
                Object.entries(filters).filter(([, v]) => v !== "")
            );

            const res = await fetch(
                `http://localhost:5000/api/items/showItems?${params.toString()}`
            );
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        }

        loadItems();
    }, [filters]);

    return (
        
        <div className="container py-4">
            <SearchPart onSearch={setFilters} />
            <ItemPart items={items} />
        </div>
    );
}