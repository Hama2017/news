import { NewsService } from "@/services/news"

export const fetchGetNews = async () => { 

    const { ok, result } = await NewsService.get();

    if (ok) {
        // do something
    } else {
        
        const error = result.detail;

        if (error === "SERVER_ERROR") {
            // do something
        }

    }
}