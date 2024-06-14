import { Box, Icon, IconButton, Pagination } from '@mui/material';
import { SimpleCard } from 'app/components';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { baseUrl } from 'app/utils/constant';
import { messages, converttodate } from 'app/utils/utils';
import 'moment/locale/fr';

const Calendrier = () => {
  moment.locale('fr');
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState({
    calendrierinventaires: [],
    calendriercree: [],
    allinventaires: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  // Evenements
  const events = data.allinventaires.map((event) => ({
    id: event.calendrierinventaire,
    title: event.description,
    start: new Date(event.heuredebut),
    end: new Date(event.heurefin),
    datecreation: new Date()
  }));
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/inventory/calendrierinventaire';
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
          calendriercree: responseData.calendriercree || [],
          calendrierinventaires: responseData.calendrierinventaires || [],
          allinventaires: responseData.allinventaires || []
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
  }, []);

  const handleSelection = ({ start, end, title }) => {
    const startString = start ? start.toLocaleString() : 'Non défini';
    const endString = end ? end.toLocaleString() : 'Non défini';
    const titleString = title ? title : 'Pas de titre';
    alert(`\nDébut: ${startString}\nFin: ${endString}\nTitre: ${titleString}`);
  };
  const handleEdit = (idcalendrierinventaire) => {
    window.location.replace('/admin/editcalendrier/' + idcalendrierinventaire);
  };

  return (
    <Box width="100%" overflow="auto">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <SimpleCard title="Calendrier d'inventaire" sx={{ marginBottom: '16px' }}>
            <div>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                selectable
                onSelectSlot={(slotInfo) =>
                  handleSelection({
                    start: slotInfo.start,
                    end: slotInfo.end,
                    title: 'Aucun inventaire de prevu'
                  })
                }
                onSelectEvent={(event) =>
                  handleSelection({
                    start: event.start,
                    end: event.end,
                    title: event.title
                  })
                }
              />
            </div>
          </SimpleCard>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', fontSize: '1.3rem', opacity: 0.7 }}
          >
            Pour aujourd'hui
          </Typography>
        </Grid>
        {data.calendrierinventaires.length === 0 ? (
          <Grid item xs={12}>
            <SimpleCard>
              <Typography
                variant="h5"
                style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}
              >
                Aucun inventaire prevu pour aujourd'hui
              </Typography>
              <Typography variant="body1" style={{ color: '#666', marginTop: '5px' }}>
                Aucune donnée d'inventaire n'a été trouvée.
              </Typography>
            </SimpleCard>
          </Grid>
        ) : (
          data.calendrierinventaires.map((inventory, index) => (
            <Grid item xs={12} key={index}>
              <SimpleCard>
                <Grid container alignItems="center" justifyContent="space-between">
                  {/* Texte principal */}
                  <Grid item xs={11}>
                    <div style={{ marginBottom: '10px' }}>
                      <Typography
                        variant="h5"
                        style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}
                      >
                        {`Inventaire du ${converttodate(inventory.datecalendrier)}`}
                      </Typography>
                      <Typography variant="body1" style={{ color: '#666', marginTop: '5px' }}>
                        {`De ${moment(inventory.heuredebut).format('HH:mm:ss')} à ${moment(
                          inventory.heurefin
                        ).format('HH:mm:ss')}`}
                      </Typography>
                    </div>
                    <ul>
                      {' '}
                      <li>
                        <Typography
                          variant="body1"
                          style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}
                        >
                          {inventory.description}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  {/* Icône de modification */}
                  <Grid item xs={1} container justifyContent="flex-end">
                    <IconButton
                      aria-label="modifier"
                      color="primary"
                      onClick={() => handleEdit(inventory.idcalendrierinventaire)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
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
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', fontSize: '1.3rem', opacity: 0.7 }}
          >
            Les plus récents
          </Typography>
        </Grid>
        {data.calendriercree.length === 0 ? (
          <Grid item xs={12}>
            <SimpleCard>
              <Typography
                variant="h5"
                style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}
              >
                Aucun inventaire prevu pour aujourd'hui
              </Typography>
              <Typography variant="body1" style={{ color: '#666', marginTop: '5px' }}>
                Aucune donnée d'inventaire n'a été trouvée.
              </Typography>
            </SimpleCard>
          </Grid>
        ) : (
          data.calendriercree.map((inventory, index) => (
            <Grid item xs={12} key={index}>
              <SimpleCard>
                <Grid container alignItems="center" justifyContent="space-between">
                  {/* Texte principal */}
                  <Grid item xs={11}>
                    <div style={{ marginBottom: '10px' }}>
                      <Typography
                        variant="h5"
                        style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}
                      >
                        {`Inventaire du ${converttodate(inventory.datecalendrier)}`}
                      </Typography>
                      <Typography variant="body1" style={{ color: '#666', marginTop: '5px' }}>
                        {`De ${moment(inventory.heuredebut).format('HH:mm:ss')} à ${moment(
                          inventory.heurefin
                        ).format('HH:mm:ss')}`}
                      </Typography>
                    </div>
                    <ul>
                      {' '}
                      <li>
                        <Typography
                          variant="body1"
                          style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}
                        >
                          {inventory.description}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  {/* Icône de modification */}
                  <Grid item xs={1} container justifyContent="flex-end">
                    <IconButton
                      aria-label="modifier"
                      color="primary"
                      onClick={() => handleEdit(inventory.idcalendrierinventaire)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </SimpleCard>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Calendrier;
