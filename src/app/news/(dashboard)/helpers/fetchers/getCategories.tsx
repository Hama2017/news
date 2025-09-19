import { CategoryService } from "@/services/category"
import { Dispatch, SetStateAction } from "react";
import { Category } from "@/types/category"

export const fetchGetCategories = async (setCategories: Dispatch<SetStateAction<Category[]>>) => {

    const { ok, result } = await CategoryService.get();

    if (ok) {
        setCategories(result)
    } else {
        const error = result.detail;
        return error
    }
}