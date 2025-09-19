import { NewsService } from "@/services/news"
import { News } from "@/types/news";

export const fetchGetNews = async () : Promise<News[]> => { 

    const { ok, result } = await NewsService.get();


    if (ok) {
         console.log(result)
        return result
    } else {
        
        const error = result.detail;
        console.log(error.detail)

        return error

    }
}