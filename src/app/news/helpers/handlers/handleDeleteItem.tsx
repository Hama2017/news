import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";

export const handleDeleteItem = (
  deletedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>) => {
  setItems((prev) => prev.filter(item => item.id !== deletedNews.id));
  setOpen(false)
};
