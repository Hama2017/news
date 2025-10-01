"use client";
import React, { useState } from "react";
import ModifierModal from "./components/ModifierModal";

// Exemple de parks
const parks = [
  { id: 1, name: "Quai des croisades" },
  { id: 2, name: "Parc Saint-Pierre" },
];

// Mock API pour récupérer les bornes d'un parc
const mockFetchBornes = async (parkId: number) => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      // Exemple : chaque parc a des bornes différentes
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
    }, 500); // délai simulé
  });
};

export default function ParksPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParkId, setSelectedParkId] = useState<number | null>(null);
  const [bornesData, setBornesData] = useState<any[]>([]);

  // Quand on clique sur "Modifier"
  const handleOpenModal = async (parkId: number) => {
    setSelectedParkId(parkId);

    try {
      const data = await mockFetchBornes(parkId); // utilisation du mock
      setBornesData(data);
      setOpenModal(true);
    } catch (err) {
      console.error("Erreur en chargeant les bornes", err);
    }
  };

  const handleSave = (data: { technicien: string; bornes: number[] }) => {
    console.log("Technicien:", data.technicien);
    console.log("Bornes sélectionnées (IDs):", data.bornes);
    setOpenModal(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Liste des parks</h2>
      <ul>
        {parks.map((park) => (
          <li key={park.id} style={{ marginBottom: 8 }}>
            {park.name}{" "}
            <button onClick={() => handleOpenModal(park.id)}>Modifier</button>
          </li>
        ))}
      </ul>

      {selectedParkId !== null && (
        <ModifierModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
          bornesData={bornesData}
        />
      )}
    </div>
  );
}
