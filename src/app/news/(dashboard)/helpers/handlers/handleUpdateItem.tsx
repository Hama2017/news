import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";

export const handleUpdateItem = (
  updatedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (!updatedNews.title.trim() || !updatedNews.subtitle.trim() || !updatedNews.category.trim()) return;

  setItems((prev) => {
    let update = [...prev];
    update = update.map((item) => (item.id === updatedNews.id ? updatedNews : item));
    return update;
  })

  setOpen(false);
};
