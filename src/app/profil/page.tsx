"use client";
import React, { useState } from "react";
import ModifierModal from "./components/ModifierModal";
import { PedestalPark } from "./interfaces";
// Exemple de parks
const parks : PedestalPark[]  = [
  { park_id: 1, park_name: "Quai des croisades",technician: "toto" },
  { park_id: 2, park_name: "Parc Saint-Pierre",technician: "tataaaa" }
];

export default function ParksPage() {
  const [openModalEditPedestalPark, setOpenModalEditPedestalPark] = useState(false);
  const [selectedPedestalPark, setSelectedPedestalPark] = useState<PedestalPark>();


  return (
    <div style={{ padding: 24 }}>
      <h2>Liste des parks</h2>
      <ul>
        {parks.map((park) => (
          <li key={park.park_id} style={{ marginBottom: 8 }}>
            {park.park_name}{" "}
            <button onClick={() => {setSelectedPedestalPark(park); setOpenModalEditPedestalPark(true);}}>Modifier</button>
          </li>
        ))}
      </ul>

      {selectedPedestalPark && (
        <ModifierModal
          openModalEditPedestalPark={openModalEditPedestalPark}
          setOpenModalEditPedestalPark = {setOpenModalEditPedestalPark}
          selectedPedestalPark={selectedPedestalPark}
        />
      )}
    </div>
  );
}
