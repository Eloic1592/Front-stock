import { Box, styled,TextField,Select,MenuItem} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect, useState } from 'react';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const Bilan =  () => {
const[annee,setAnnee]=useState('');
             
  useEffect(() => {
  },[]);
        
        return (
            <Container>
            <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Bilan general", path: "admin/bilan" }, { name: "Bilan general" }]} />
            </Box>

          <SimpleCard title="Rechercher dans le bilan" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={2}>
               <Grid item xs={6}>
                <TextField
                 fullWidth
                 size="small"
                 type="text"
                 name="annee"
                 label="Annee"
                 variant="outlined"
                 value={annee}
                 onChange={(event) => setAnnee(event.target.value)}
                 sx={{ mb: 3 }}
               />
               </Grid>
             <Grid item xs={6}>
              <Select
                fullWidth
                size="small"
                 labelId="select-label"
                 value={"1"}
                //  onChange={handleChange}
                  >
                 <MenuItem value="1">Janvier</MenuItem>
                 <MenuItem value="2">Fevrier</MenuItem>
                 <MenuItem value="3">Mars</MenuItem>
                 <MenuItem value="4">Avril</MenuItem>
                 <MenuItem value="5">Mai</MenuItem>
                 <MenuItem value="6">Juin</MenuItem>
                 <MenuItem value="7">Juillet</MenuItem>
                 <MenuItem value="8">Aout</MenuItem>
                 <MenuItem value="9">Septembre</MenuItem>
                 <MenuItem value="10">Octobre</MenuItem>
                 <MenuItem value="11">Novembre</MenuItem>
                 <MenuItem value="12">Decembre</MenuItem>
              </Select>
            </Grid>
          </Grid>
            </div>
            </form>
          </SimpleCard>


            <Box sx={{ py: '12px' }} />
              <Grid container spacing={2}>
               <Grid item xs={6}>
               <SimpleCard title="ENTREE">       
               </SimpleCard>
               </Grid>
               <Grid item xs={6}>
               <SimpleCard title="SORTIE">
               </SimpleCard>
               </Grid>
              </Grid>
              <Box sx={{ py: '12px' }} />
              <Grid container spacing={2}>
               <Grid item xs={3}>
               <SimpleCard title="ACHAT">       
               </SimpleCard>
               </Grid>
               <Grid item xs={3}>
               <SimpleCard title="VENTE">       
               </SimpleCard>
               </Grid>
               <Grid item xs={3}>
               <SimpleCard title="DON">       
               </SimpleCard>
               </Grid>
               <Grid item xs={3}>
               <SimpleCard title="TRANSFERT">       
               </SimpleCard>
               </Grid>
              </Grid>

              <Box sx={{ py: '12px' }} />
                <Grid container spacing={2}>
                <Grid item xs={6}>
               <SimpleCard title="Total materiel en entree">
               </SimpleCard>
               </Grid>
               <Grid item xs={6}>
               <SimpleCard title="Total materiel en sortie">
               </SimpleCard>
               </Grid>
              </Grid>



              </Container>    
          );
        };

export default Bilan;