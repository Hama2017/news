"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Button,
  TextField,
  Checkbox,
  Box,
  Paper,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { PedestalPark, PedestalsInPark } from "../interfaces";
import { fetchPedestalsInPark } from "../helpers/fetchers/getPedestalsInPark";
import {handleUpdatePedestalPark} from "../helpers/handlers/updatePedestalPark"
import { handleToggleSelectedPedestal } from "../helpers/handlers/getToggleSelectedPedestal";
interface Props {
  openModalEditPedestalPark: boolean
  setOpenModalEditPedestalPark:Dispatch<SetStateAction<boolean>>,
  selectedPedestalPark: PedestalPark | undefined
}

const ModalEditPedestalPark = ({ openModalEditPedestalPark, setOpenModalEditPedestalPark, selectedPedestalPark}: Props) => {

  if (!selectedPedestalPark) return null

  const [pedestalsInPark, setPedestalsInPark] = useState<PedestalsInPark[]>([]);
  const [selectedPedestals, setSelectedPedestals] = useState<number[]>([]);
  const [technician, setTechnician] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {setTechnician(selectedPedestalPark.technician)}, [selectedPedestalPark]);

  useEffect(() => {fetchPedestalsInPark(selectedPedestalPark.park_id,setPedestalsInPark)}, [selectedPedestalPark]);

  useEffect(() => {
      const preSelectedPedestals = pedestalsInPark.filter((p) => p.is_associated).map((p) => p.borne_id);
      setSelectedPedestals(preSelectedPedestals);
  }, [pedestalsInPark]);


  return (
    <Dialog
      open={openModalEditPedestalPark}
      fullWidth
      maxWidth="lg"
    >
      <DialogContent sx={styles.dialogContent}>
        {/* Ligne du haut : Fermer + X */}
        <Box sx={styles.closeContainer}>
          <Typography
            variant="body2"
            onClick={()=>setOpenModalEditPedestalPark(false)}
            sx={styles.closeText}
          >
            Fermer
          </Typography>
          <IconButton size="small" onClick={()=>setOpenModalEditPedestalPark(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Ligne 2 colonnes 50/50 */}
        <Box sx={styles.twoColumns}>
          {/* Colonne gauche */}
          <Box>
            <Typography variant="body1" sx={styles.label}>
              Sélectionnez les bornes que vous souhaitez associer au parc :
              <b>{selectedPedestalPark.park_name}</b>
            </Typography>

            <TextField
              label="Technician"
              fullWidth
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              error={error}
              helperText={error ? "Renseignez le nom du Technician" : ""}
              inputRef={input => input && input.focus()}
            />
          </Box>

          {/* Colonne droite */}
          <Box sx={styles.rightColumn}>
            <Button
              variant="contained"
              onClick={()=>{handleUpdatePedestalPark(selectedPedestalPark.park_id,technician, selectedPedestals,setError)}}
              onKeyDown={e => e.key === 'Enter' ? alert("de"): ''}
              sx={styles.saveButton}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>

        {/* Nombre bornes */}
        <Typography variant="subtitle2" sx={styles.counter}>
          {selectedPedestals.length} bornes sélectionnées
        </Typography>

        {/* Conteneur scrollable */}
        <Box sx={styles.scrollContainer}>
          <Box sx={styles.itemsContainer}>
            {pedestalsInPark.map((pedestal) => {
              const checked = selectedPedestals.includes(pedestal.borne_id);
              return (
                <Paper
                  key={pedestal.borne_id}
                  elevation={0}
                  onClick={() => handleToggleSelectedPedestal(pedestal.borne_id,setSelectedPedestals,selectedPedestals)}
                  sx={{
                    ...styles.borneItem,
                    backgroundColor: checked ? "#E3F2FD" : "transparent",
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => handleToggleSelectedPedestal(pedestal.borne_id,setSelectedPedestals,selectedPedestals)}
                    sx={styles.checkbox}
                  />
                  <Typography variant="body2">{pedestal.borne_name}</Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// Styles externalisés
const styles = {
  dialog: {
    borderRadius: 3,
    overflow: "hidden",
  },
  dialogContent: {
    p: 2,
  },
  closeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 2,
  },
  closeText: {
    mr: 1,
    cursor: "pointer",
    color: "text.secondary",
  },
  twoColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
    alignItems: "start",
    mb: 2,
  },
  label: {
    mb: 1,
  },
  rightColumn: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  saveButton: {
    borderRadius: "999px",
    textTransform: "none",
    px: 3,
    py: 1,
  },
  counter: {
    mb: 1,
  },
  scrollContainer: {
    border: "1px solid #E0E0E0",
    borderRadius: 2,
    p: 2,
    maxHeight: 360,
    overflowY: "hidden",
    overflowX: "hidden",
    backgroundColor: "white",
    mb: 1,
    "&:hover": {
      overflowY: "scroll",
    },
    "&::-webkit-scrollbar": {
      width: "10px",
      WebkitAppearance: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#9e9e9e",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#9e9e9e #f1f1f1",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  borneItem: {
    display: "flex",
    alignItems: "center",
    p: 1.25,
    borderRadius: 2,
    border: "1px solid #DDD",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
  checkbox: {
    pointerEvents: "none",
  },
};

export default ModalEditPedestalPark; 