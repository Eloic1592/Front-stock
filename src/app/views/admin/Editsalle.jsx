// Nouvelle feuille
import { Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent} from "@mui/material";

import { useState } from "react";
import { deleteData, Finddata, insertData, UpdateData } from '../functions';


const handleSubmit = async  () => {
    // const result = await UpdateData({"salle":salle,"etat":0},getUselink+'updatesalle');
}
  
const Editsalle = ({ open,close,object }) => {
  const [salle, setSalle] = useState('vide');

    return (
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier salle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            id="salle"
            type="text"
            margin="dense"
            label="Salle"
            name="salle"
            value={salle}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={close} color="secondary" /*onClick={handleClose}*/>
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  
export {Editsalle};
  