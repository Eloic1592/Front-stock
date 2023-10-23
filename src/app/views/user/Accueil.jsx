import { Box,Card, Grid, styled} from '@mui/material';
import { Breadcrumb} from "app/components";
import { Fragment } from 'react';
import StatCards from 'app/views/shared/StatCards';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));



const Accueil = () => {

  return (
    <Fragment>
    <ContentBox className="analytics">
      <Grid container spacing={6}>
        <Grid item lg={12} md={12}  sm={12} xs={12}>
        <Card sx={{ px: 3, py: 2, mb: 2 }}>
          <Box className="breadcrumb">
            <Breadcrumb
                   routeSegments={[{ name: "Demande"}]}
                 />
               </Box>
            </Card>
              <StatCards 
                 nameSet="Logiciel" 
                 labelName="Logiciel" 
                 iconName="laptop" 
                 TooltipName="Probleme logiciel et installation" 
                 key={1}
                url="user/logiciel/"

              />
              <StatCards 
                 nameSet="Materiel" 
                 labelName="Materiel" 
                 iconName="settings" 
                 TooltipName="Probleme Materiel" 
                 key={2}
                url="user/materiel/"

              />
                <StatCards 
                 nameSet="Reseau" 
                 labelName="Reseau" 
                 iconName="wifi" 
                 TooltipName="Probleme de reseau" 
                 key={3}
                 url="user/reseau"
              />
              <StatCards 
                 nameSet="Demande" 
                 labelName=" Autre Demande" 
                 iconName="create" 
                 TooltipName="Pour les demandes speciales" 
                 key={4}
                 url="user/autre"

              />
              <StatCards 
                 nameSet="Conversation" 
                 labelName="Conversation" 
                 iconName="person" 
                 TooltipName="Discussion" 
                  key={5}
                  url="user/discussion"

              />
            </Grid>
          </Grid>
        </ContentBox>
      </Fragment>
  
  );
};

export default Accueil;
