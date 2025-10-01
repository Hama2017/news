"use client";
import React, { useState, useEffect } from "react";
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

interface Borne {
  borne_id: number;
  borne_name: string;
  is_associated: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave?: (data: { technicien: string; bornes: number[] }) => void;
  bornesData: Borne[]; // maintenant on reçoit les bornes comme props
}

type Status = "idle" | "loading" | "success" | "error";

export default function ModifierModal({ open, onClose, onSave, bornesData }: Props) {
  const [technicien, setTechnicien] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [selectedBornes, setSelectedBornes] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  // Initialisation des bornes sélectionnées si is_associated === true
  useEffect(() => {
    if (bornesData) {
      const preSelected = bornesData
        .filter((b) => b.is_associated)
        .map((b) => b.borne_id);
      setSelectedBornes(preSelected);
    }
  }, [bornesData, open]); // se réinitialise à l'ouverture du modal

  const handleToggle = (borne_id: number) => {
    setSelectedBornes((prev) =>
      prev.includes(borne_id) ? prev.filter((id) => id !== borne_id) : [...prev, borne_id]
    );
  };

  const handleSave = async () => {
    if (!technicien.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      onSave?.({ technicien, bornes: selectedBornes }); // retourne seulement les borne_id
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 900);
    }, 700);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        {/* Ligne du haut : Fermer + X */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography
            variant="body2"
            onClick={onClose}
            sx={{ mr: 1, cursor: "pointer", color: "text.secondary" }}
          >
            Fermer
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Ligne 2 colonnes 50/50 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            alignItems: "start",
            mb: 2,
          }}
        >
          {/* Colonne gauche */}
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Sélectionnez les bornes que vous souhaitez associer au parc :{" "}
              <b>Quai des croisades</b>
            </Typography>

            <TextField
              label="Technicien"
              fullWidth
              value={technicien}
              onChange={(e) => setTechnicien(e.target.value)}
              error={error}
              helperText={error ? "Renseignez le nom du technicien" : ""}
            />
          </Box>

          {/* Colonne droite */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={status === "loading"}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                px: 3,
                py: 1,
              }}
            >
              {status === "loading"
                ? "Patientez..."
                : status === "success"
                ? "Enregistré"
                : status === "error"
                ? "Non enregistré"
                : "Enregistrer"}
            </Button>
          </Box>
        </Box>

        {/* Nombre bornes */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {selectedBornes.length} bornes sélectionnées
        </Typography>

        {/* Conteneur scrollable */}
        <Box
          sx={{
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
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {bornesData.map((borne) => {
              const checked = selectedBornes.includes(borne.borne_id);
              return (
                <Paper
                  key={borne.borne_id}
                  elevation={0}
                  onClick={() => handleToggle(borne.borne_id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.25,
                    borderRadius: 2,
                    border: "1px solid #DDD",
                    cursor: "pointer",
                    backgroundColor: checked ? "#E3F2FD" : "transparent",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => handleToggle(borne.borne_id)}
                    sx={{ pointerEvents: "none" }}
                  />
                  <Typography variant="body2">{borne.borne_name}</Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>

        {/* Messages */}
        {status === "success" && (
          <Alert severity="success">Données enregistrées avec succès !</Alert>
        )}
        {status === "error" && (
          <Alert severity="error">Erreur lors de l'enregistrement</Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
