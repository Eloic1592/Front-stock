import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

const ComparisonChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', right: '5%' },
    legend: { show: false },
    color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
    barGap: 0,
    barMaxWidth: '64px',
    dataset: {
      source: [
        ['Janvier', 256874, 146989],
        ['Fevrier', 262797, 5839],
        ['Mars', 108973, 808211],
        ['Avril', 866121, 180100],
        ['Mai', 87543, 930735],
        ['Juin', 420346, 921161],
        ['Juillet', 619842, 186516],
        ['Aout', 612971, 540340],
        ['Septembre', 996516, 87660],
        ['Octobre', 629946, 632974],
        ['Novembre', 618415, 306495],
        ['Decembre', 960206, 168686]
      ]
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar', stack: 'This month', name: 'This month', smooth: true },
      { type: 'bar' }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default ComparisonChart;
