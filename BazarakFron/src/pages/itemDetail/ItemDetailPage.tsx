import { ItemDetailPart } from "./parts/ItemDetailPart.tsx";
import {ItemDetailCommentsPart} from "./parts/ItemDetailCommentsPart.tsx";


export function ItemDetailPage() {

  return (
    <>
        <ItemDetailPart />
        <ItemDetailCommentsPart />
    </>
  );
}