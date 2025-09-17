import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";

export const handleOpenConfirmDeleteModal = (
    news: News,
    setNewsToDelete: Dispatch<SetStateAction<News | undefined>>,
    setOpenConfirmDeleteModal: Dispatch<SetStateAction<boolean>>
) => {
    setNewsToDelete(news);
    setOpenConfirmDeleteModal(true);
};
