import {ItemPart} from "./parts/ItemPart";
import {SearchPart} from "./parts/SearchPart";

export function HomePage() {
    return (
        
        <div className="container py-4">
            <SearchPart />
            <ItemPart />
        </div>
    );
}