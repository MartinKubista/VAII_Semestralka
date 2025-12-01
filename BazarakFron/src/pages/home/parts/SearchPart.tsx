export function SearchPart() {
    return (
    <div className="card mb-4 shadow">
        <div className="card-body">

            <form className="row g-3">

                {/* 🔎 Search + button */}
                <div className="col-12">
                    <label className="form-label">Hľadať</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hľadať podľa názvu alebo popisu"
                        />
                        <button className="btn btn-outline-primary" type="button">
                            Hľadať
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Cena</label>
                    <div className="d-flex gap-2">
                        <input type="number" className="form-control" placeholder="Min €" />
                        <input type="number" className="form-control" placeholder="Max €" />
                    </div>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Lokalita</label>
                    <select className="form-select">
                        <option value="">Vyber lokalitu</option>
                        <option>Bratislava</option>
                        <option>Košice</option>
                        <option>Žilina</option>
                        <option>Prešov</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Pridané</label>
                    <select className="form-select">
                        <option value="">Kedykoľvek</option>
                        <option value="24h">Posledných 24 hodín</option>
                        <option value="7d">Posledných 7 dní</option>
                        <option value="30d">Posledných 30 dní</option>
                    </select>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary w-20">Filtrovať</button>
                </div>
            </form>

        </div>
    </div>
    );
}