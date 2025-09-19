import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import { NewsService } from "@/services/news";

export const handleSaveItem = async (
  savedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {

  if (!savedNews.title.trim() || !savedNews.subtitle.trim() || !savedNews.category.id) return

  try {
    const { ok, result } = await NewsService.post(savedNews);

    if (ok) {
      setItems((prev) => [...prev, { ...savedNews, id: result.id },]);
      setOpen(false);
      console.log("Ok", result);
    } else {
      const error = result.detail;
      console.error("Error :", error);
    }

  } catch (error) {
    console.error("Error Server:", error);
  }
};