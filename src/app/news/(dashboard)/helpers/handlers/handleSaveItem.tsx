import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import {generateID} from "@/app/news/(dashboard)/helpers/utils/generateID"
export const handleSaveItem = (
  savedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (!savedNews.title.trim() || !savedNews.subtitle.trim() || !savedNews.category.trim()) return;

  const newItem: News = { ...savedNews, id: generateID()};

  setItems((prev) => [newItem, ...prev]);
  setOpen(false);

};
