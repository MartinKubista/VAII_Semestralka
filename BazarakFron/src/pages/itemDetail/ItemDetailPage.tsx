import { ItemDetailPart } from "./parts/itemDetailPart.tsx";
import {ItemDetailCommentsPart} from "./parts/ItemDetailCommentsPart.tsx";


export function ItemDetailPage() {

  return (
    <>
        <ItemDetailPart />
        <ItemDetailCommentsPart />
    </>
  );
}