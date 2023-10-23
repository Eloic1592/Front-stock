import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { NavLink} from 'react-router-dom'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = ({nameSet,labelName,iconName,TooltipName,indexNumber,url}) => {
  return (
    <Grid container spacing={6} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6} key={indexNumber}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">{iconName}</Icon>
            <Box ml="12px">
              <Small>{nameSet}</Small>
              <Heading>{labelName}</Heading>
            </Box>
          </ContentBox>

          <Tooltip title={TooltipName} placement="top">
              <IconButton>
                <NavLink to={url} >
                   <Icon>arrow_right_alt</Icon>
                 </NavLink>
              </IconButton>
            </Tooltip>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default StatCards;
