import { Dispatch, SetStateAction } from "react";

export const handleToggleSelectedPedestal = (
  pedestalId: number,
  setSelectedPedestals: Dispatch<SetStateAction<number[]>>,
  selectedPedestals: number[]
) => {
  if (selectedPedestals.includes(pedestalId)) {

    if (selectedPedestals.length === 1) {
      alert("Vous devez garder au moins une borne sélectionnée.");
      return;
    }
    setSelectedPedestals((prev) => prev.filter((id) => id !== pedestalId));
  } else {
    setSelectedPedestals((prev) => [...prev, pedestalId]);
  }
};
