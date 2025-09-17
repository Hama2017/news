import { Dispatch, SetStateAction } from "react";
import { News } from "@/types/news";
import { ModalFormMode } from "@/types/enums";

export const handleOpenEditModal = (
    news: News,
    setNewsToEdit: Dispatch<SetStateAction<News | undefined>>,
    setModalFormMode: Dispatch<SetStateAction<ModalFormMode>>,
    setOpenAddEditModal: Dispatch<SetStateAction<boolean>>
) => {

    setModalFormMode(ModalFormMode.EDIT);
    setNewsToEdit(news);
    setOpenAddEditModal(true);
};
