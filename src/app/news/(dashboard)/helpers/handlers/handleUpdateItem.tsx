import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import { NewsService } from "@/services/news";

export const handleUpdateItem = async (
  updatedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (!updatedNews.title.trim() || !updatedNews.subtitle.trim() || !updatedNews.category || !updatedNews.id) return;

  try {
    const { ok, result } = await NewsService.update(updatedNews.id, updatedNews);

    if (ok) {
      setItems((prev) => {
        let update = [...prev];
        update = update.map((item) => (item.id === updatedNews.id ? updatedNews : item));
        return update;
      })
      setOpen(false);
      console.log("Ok", result);
    } else {
      console.error("Error :", result.detail);
    }

  } catch (error) {
    console.error("Error Server:", error);
  }



};
