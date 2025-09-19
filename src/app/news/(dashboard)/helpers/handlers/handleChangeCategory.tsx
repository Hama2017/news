import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import { Category } from "@/types/category";

export const handleChangeCategory = async (
  setNews: Dispatch<SetStateAction<News>>,
  categoryId: number,
  categories : Category[] | undefined
) => {
  const selectedCategoryId = categoryId;
  if (!categories) return
  const selectedCategory: Category | undefined = categories.find(c => c.id === selectedCategoryId);
  if (!selectedCategory) return
  setNews((prev) => ({ ...prev, category: selectedCategory }))

};

