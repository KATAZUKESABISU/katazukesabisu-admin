import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import useChart from '../../../hook/useChart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

interface AppWebsiteVisitsProps extends CardProps {
  title: string;
  subheader?: string;
  chartLabels: string[];
  chartData: {
    name: string,
    type: string,
    fill: string,
    data: number[],
  }[];
}



export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }: AppWebsiteVisitsProps) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y?: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions as ApexOptions} height={364} />
      </Box>
    </Card>
  );
}