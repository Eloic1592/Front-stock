import React, { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
  Pagination
} from '@mui/material';
import { SimpleCard } from 'app/components';
import { converttodate } from 'app/utils/utils';
import moment from 'moment';

const InventaireNotification = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    calendrierinventaires: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const itemsPerPage = 2;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/inventory/calendriernotif';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          calendrierinventaires: responseData.calendrierinventaires || []
        };
        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();

    const today = new Date().toLocaleDateString();
    const notiftoday = localStorage.getItem('notiftoday');

    // Vérifiez si le swal a déjà été affiché aujourd'hui
    if (notiftoday !== today) {
      setOpen(true);
    }

    // Marquez la date du swal comme affichée aujourd'hui
    localStorage.setItem('notiftoday', today);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Inventaires pour aujourd'hui</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            {data.calendrierinventaires.slice(startIndex, endIndex).length === 0 ? (
              <Grid item xs={12}>
                <SimpleCard style={{ padding: '8px' }}>
                  <Typography
                    variant="h6" // Taille de police réduite
                    style={{ color: 'black', fontWeight: 'bold' }}
                  >
                    Aucun inventaire prevu pour aujourd'hui
                  </Typography>
                </SimpleCard>
              </Grid>
            ) : (
              data.calendrierinventaires.slice(startIndex, endIndex).map((inventory, index) => (
                <Grid item xs={12} key={index}>
                  <SimpleCard style={{ padding: '8px' }}>
                    <Grid container direction="row" alignItems="center">
                      {/* Section Texte */}
                      <Grid item xs={11}>
                        <Typography
                          variant="h6" // Taille de police réduite
                          style={{ color: 'black', fontWeight: 'bold' }}
                        >
                          {`Inventaire du ${converttodate(inventory.datecalendrier)}`}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#666', marginTop: '5px' }}>
                          {`De ${moment(inventory.heuredebut).format('HH:mm:ss')} à ${moment(
                            inventory.heurefin
                          ).format('HH:mm:ss')}`}
                        </Typography>
                        <Typography variant="body2" style={{ color: 'black', fontWeight: 'bold' }}>
                          {inventory.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </SimpleCard>
                </Grid>
              ))
            )}

            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(data.calendrierinventaires.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventaireNotification;
