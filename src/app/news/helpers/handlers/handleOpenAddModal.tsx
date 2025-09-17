import { Dispatch, SetStateAction } from "react";
import { ModalFormMode } from "@/types/enums";

export const handleOpenAddModal = (
    setModalFormMode: Dispatch<SetStateAction<ModalFormMode>>,
    setOpenAddEditModal: Dispatch<SetStateAction<boolean>>,
) => {

    setModalFormMode(ModalFormMode.ADD);
    setOpenAddEditModal(true);
}
