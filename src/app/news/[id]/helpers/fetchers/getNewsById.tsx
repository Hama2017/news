import { NewsService } from "@/services/news"
import { News } from "@/types/news";
import { Dispatch, SetStateAction } from "react";

export const fetchGetNewsById = async (id:number,setItems: Dispatch<SetStateAction<News | undefined>> ) => {

    const { ok, result } = await NewsService.getById(id);

    if (ok) {
        setItems(result)
    } else {

        const error = result.detail;
        return error

    }
}