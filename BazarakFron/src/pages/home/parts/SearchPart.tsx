import { useState } from "react";
import type { FormEvent } from "react";

type SearchFilters = {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  added: string;
};

type Props = {
    onSearch: (filters: SearchFilters) => void;
};

export function SearchPart({ onSearch }: Props) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [location, setLocation] = useState("");
    const [added, setAdded] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSearch({
            query,
            category,
            minPrice,
            maxPrice,
            location,
            added
        });
    };

    return (
        <div className="card mb-4 shadow">
            <div className="card-body">

                <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Hľadať podľa názvu alebo popisu"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <select
                            className="form-select p-2"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="">-- Vyberte kategóriu --</option>
                            <option>Elektronika</option>
                            <option>Nábytok</option>
                            <option>Oblečenie</option>
                            <option>Šport</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Cena</label>
                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Min €"
                                min="0"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Max €"
                                min="0"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Lokalita</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zadaj lokalitu"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Pridané</label>
                        <select
                            className="form-select"
                            value={added}
                            onChange={e => setAdded(e.target.value)}
                        >
                            <option value="">Kedykoľvek</option>
                            <option value="24h">Posledných 24 hodín</option>
                            <option value="7d">Posledných 7 dní</option>
                            <option value="30d">Posledných 30 dní</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Vyhľadať
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}