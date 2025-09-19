import { CategoryService } from "@/services/category"
import { Category } from "@/types/category";

export const fetchGetCategories = async () : Promise<Category[]> => { 

    const { ok, result } = await CategoryService.get();

    if (ok) {
         console.log(result)
        return result
    } else {
        const error = result.detail;
        console.log(error.detail)
        return error
    }
}