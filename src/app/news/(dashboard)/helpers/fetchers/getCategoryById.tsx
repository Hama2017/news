import { CategoryService } from "@/services/category"
import { Category } from "@/types/category";

export const fetchGetCategoryById = async (id:number) : Promise<Category> => { 

    const { ok, result } = await CategoryService.getById(id);

    if (ok) {
         console.log(result)
        return result
    } else {
        const error = result.detail;
        console.log(error.detail)
        return error
    }
}