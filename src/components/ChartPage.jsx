import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chartData } from '../feactures/slice/cryptoSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';


ChartJS.register(
  LineElement,
  CategoryScale, // x axis
  LinearScale,  // y axis
  PointElement,
)
const ChartPage = () => {

  const { coinId } = useParams();
  const dispatch = useDispatch();
  const { chart, isLoading, isError } = useSelector((state) => state.coins);


  useEffect(() => {
    dispatch(chartData(coinId));
  }, [dispatch, coinId]);



  const data = {
    labels: chart.map((dataPoint) => new Date(dataPoint[0]).toLocaleTimeString()),
    datasets: [
      {
        label: 'Price',
        data: chart.map((dataPoint) => dataPoint[1]),
        fill: false,
        borderColor: 'green',
      },
    ],
  };

  const options = {
    Plugin: {
      legend: true
    },
    scales: {
      x: {


      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while fetching chart data.</div>;
  }

  return (
    <div className='bg-light shadow text-light'>
      <div style={{ maxWidth: '800px', margin: '0 auto', height: '400px' }}>
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default ChartPage;
