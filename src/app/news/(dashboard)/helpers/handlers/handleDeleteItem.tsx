import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import { NewsService } from "@/services/news"

export const handleDeleteItem = async (
  deletedNews: News,
  setItems: Dispatch<SetStateAction<News[]>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {

  if (!deletedNews.id) return

  try {
    const { ok, result } = await NewsService.remove(deletedNews.id);

    if (ok) {
      setItems((prev) => prev.filter(item => item.id !== deletedNews.id));
      setOpen(false)
      console.log("Ok", result);
    } else {
      console.error("Error :", result.detail);
    }

  } catch (error) {
    console.error("Error Server:", error);
  }


};

