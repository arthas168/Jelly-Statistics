import React from 'react';
import { Pie } from 'react-chartjs-2';

export default ({ chartData, titleText, tooltips }) => {
  return (
    <div className='chart'>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          legend: {
            position: 'left',
            labels: {
              padding: 15,
              fontColor: '#fcfcfc'
            }
          },
          title: {
            display: true,
            text: titleText,
            fontColor: '#fcfcfc',
            fontSize: '18',
            padding: '15'
          },
          tooltips: {
            ...tooltips
          }
        }}
      />
    </div>
  );
};

export const getDataset = (label, data) => {
  return [
    {
      label,
      data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }
  ];
};
