import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { Link } from 'react-router-dom';

const Histogram = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/AfficheMinMaxTot')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Cr¨¦er le graphique seulement si des donn¨¦es sont disponibles
    if (data.length > 0) {
      const values = [data[0].minimal, data[0].maximal, data[0].total];

      //detruire le graphique existant s'il y en a un
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Prix minimal', 'Prix maximal', 'Prix total'],
          datasets: [{
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: false,
          width: 800,
          height: 400
        }
      });
      chartRef.current = newChart;
    }
  }, [data]);

  return (
    <div className='container'>
      <div className="p-4 fixed-top bg-secondary">
        <div className="container-fluid">
          <h3 className='text text-white'>Gestion de vente des produits</h3>
        </div>
      </div>
      <h1>Histogramme</h1>
      <br></br>
      <br></br>
      <br></br>
      <div className='d-flex justify-content-start'>
        <Link to='/' className='btn btn-secondary'>Retour</Link>
      </div>
      <div className='centered'>
        <canvas id="myChart" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default Histogram;

