import { News } from "@/types/news";
import { Dispatch, SetStateAction } from "react";

export const handleSearch = (
    items : News[],
    setFilteredItems: Dispatch<SetStateAction<News[]>>,
    searchTarget: string,
) => {
    setFilteredItems(items.filter(item=> item.title.toLowerCase().includes(searchTarget.toLowerCase())))
}
