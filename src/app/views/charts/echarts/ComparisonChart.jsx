import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

const ComparisonChart = ({ height, color = [], data }) => {
  const theme = useTheme();
  const generateDataSource = (data) => {
    const categories = ['mois_nom', 'depenses_mensuelles'];

    const values = data.map((item) => {
      categories.push(item.mois_nom);
      return [item.mois_nom, item.depenses_mensuelles];
    });

    return [categories, ...values];
  };

  const dataSource = generateDataSource(data);
  const option = {
    grid: { top: '10%', bottom: '10%', right: '5%' },
    legend: { show: true },
    color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
    barGap: 0,
    barMaxWidth: '64px',
    dataset: {
      source: [
        ['Janvier', 3000000],
        ['Fevrier', 2100000],
        ['Mars', 4500000],
        ['Avril', 5500000],
        ['Mai', 6575000],
        ['Juin', 8400000],
        ['Juillet', 500000],
        ['Aout', 300000],
        ['Septembre', 750000],
        ['Octobre', 400000],
        ['Novembre', 256874],
        ['Decembre', 256874]
      ]
    },
    xAxis: {
      type: 'category',
      axisLine: { show: true },
      splitLine: { show: true },
      axisTick: { show: true },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      },
      tooltip: {
        trigger: 'axis', // Afficher le tooltip au survol de la barre
        axisPointer: {
          // Style du pointeur
          type: 'shadow' // Type de pointeur pour les barres
        },
        formatter: function (params) {
          const mois_nom = params[0].name; // Nom du mois survolé
          const depenses_mensuelles = params[0].value; // Valeur des dépenses mensuelles

          return `Mois : ${mois_nom}<br />Dépenses mensuelles : ${depenses_mensuelles}`;
        }
      }
    },
    series: [{ type: 'bar', stack: 'Depenses articles', name: 'Dépense articles', smooth: true }]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default ComparisonChart;
