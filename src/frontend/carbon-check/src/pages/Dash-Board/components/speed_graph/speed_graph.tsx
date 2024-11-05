import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { Box, Typography } from '@mui/material';

const TrustComponent: React.FC<{ value: number, minValue: number, maxValue: number }> = ({ value, minValue, maxValue }) => {
  // Normaliza o valor para estar entre 0 e 100
  const normalizedValue = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Stack direction="column" spacing={-3.5} alignItems="center" justifyContent="center">
        <Gauge
          value={normalizedValue}
          width={250}  // Ajuste aqui para o mesmo valor do TextGraph
          height={250}  // Ajuste aqui para o mesmo valor do TextGraph
          startAngle={-90}
          endAngle={90}
          sx={{
            '& .MuiGauge-fill': {
              stroke: 'url(#gradient)',
            },
            '& .MuiGauge-track': {
              stroke: '#e6f7e9',
            },
            '& text': { 
              display: 'none',
            },
          }}
        />

        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#077336', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8bc34a', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #077336, #8bc34a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>

        <Box display="flex" justifyContent="space-between" width="100%" maxWidth="250px">
          <Typography variant="body2" sx={{ ml: 2.5 }}>
            {minValue}
          </Typography>
          <Typography variant="body2" sx={{ mr: 1.5 }}>
            {maxValue}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const VelocimeterGraph: React.FC = () => {
  const [minValue, setMinValue] = useState<number | null>(null); // Estado para o valor mínimo de árvores
  const [maxValue, setMaxValue] = useState<number | null>(null); // Estado para o valor máximo de árvores
  const [centralValue, setCentralValue] = useState<number | null>(null); // Estado para o valor central de árvores
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // Função para buscar as métricas da API
  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/metrics'); // URL da API para buscar métricas
      if (response.ok) {
        const data = await response.json();
        setMinValue(data.estimated_trees_min); // Atualiza o valor mínimo de árvores
        setMaxValue(data.estimated_trees_max); // Atualiza o valor máximo de árvores
        setCentralValue(data.estimated_trees_central); // Atualiza o valor central
      } else {
        console.error('Erro ao buscar as métricas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(); // Chama a função para buscar métricas ao montar o componente
  }, []);

  return (
    <div className="bg-white shadow-lg w-full border w-1/2 border border-gray-300 p-6">
      {isLoading ? (
        <Typography variant="h6" align="center">Carregando métricas...</Typography>
      ) : (
        <TrustComponent
          value={centralValue !== null ? centralValue : 0} // Usa o valor central para o gráfico
          minValue={minValue !== null ? minValue : 0} // Usa o valor mínimo de árvores
          maxValue={maxValue !== null ? maxValue : 100} // Usa o valor máximo de árvores
        />
      )}
      <h2 className="text-center text-xl font-bold mt-5 mb-10">Intervalo de Árvores</h2>
    </div>
  );
};

export default VelocimeterGraph;
