import { Dispatch, SetStateAction } from "react";
import { PedestalsInParkEditForm } from "../../interfaces";
  export const handleUpdatePedestalPark = async (
    parkId: number,
    technician: string,
    pedestals: number[],
    setError: Dispatch<SetStateAction<boolean>>) => {

  if (!technician.trim()) {
      setError(true);
      return;
    }

  if (pedestals.length==0) {
      setError(true);
      return;
    }
    setError(false);

    const pedestalsInParkEditForm : PedestalsInParkEditForm = {
      park_id:parkId,
      technician:technician,
      pedestals_ids:pedestals
    }

    console.log(pedestalsInParkEditForm);
    


  };