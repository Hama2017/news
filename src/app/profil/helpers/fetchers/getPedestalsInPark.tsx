import { Dispatch, SetStateAction } from "react";

const mockFetchBornes = async (parkId: number) => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      if (parkId === 1) {
        resolve([
          { borne_id: 1, borne_name: "Borne A", is_associated: true },
          { borne_id: 2, borne_name: "Borne B", is_associated: false },
          { borne_id: 3, borne_name: "Borne C", is_associated: true },
        ]);
      } else {
        resolve([
          { borne_id: 4, borne_name: "Borne D", is_associated: false },
          { borne_id: 5, borne_name: "Borne E", is_associated: true },
          { borne_id: 6, borne_name: "Borne F", is_associated: false },
        ]);
      }
    }, 500);
  });
};

  export const fetchPedestalsInPark = async (
    parkId: number,
    setPedestalsInPark: Dispatch<SetStateAction<any[]>>) =>{

    try {
      const data = await mockFetchBornes(parkId);
      setPedestalsInPark(data);
    } catch (err) {
      console.error("Erreur en chargeant les bornes", err);
    }

  };