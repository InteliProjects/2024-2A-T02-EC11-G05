import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import carbono from '../text_graph/CO2_icon.png';
import treeIcon from '../text_graph/tree_icon.png';

interface TreeNumberProps {
  value: number | string;
  label: string;
  imageSrc?: string;
}

const TreeNumber: React.FC<TreeNumberProps> = ({ value, label, imageSrc }) => {
  const imageSource = imageSrc === 'tree' ? treeIcon : carbono;

  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 3 }}>
      <Box
        sx={{
          width: 130,
          height: 130,
          borderRadius: '50%',
          border: '3px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 1.5,
        }}
      >
        <Typography variant="h6" align="center">
          {value}
        </Typography>
      </Box>

      <Typography variant="body2" align="center">{label}</Typography>

      {imageSrc && (
        <Box mt={3}>
          <img src={imageSource} alt={label} width={40} height={40} style={{ marginTop: '10px' }} />
        </Box>
      )}
    </Box>
  );
};

const TextGraph: React.FC = () => {
  const [totalTrees, setTotalTrees] = useState<number | null>(null); // Estado para armazenar o número total de árvores
  const [totalCarbon, setTotalCarbon] = useState<number | null>(null); // Estado para armazenar o carbono sequestrado
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // Função para buscar as métricas da API
  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/metrics'); // URL da API para buscar métricas
      if (response.ok) {
        const data = await response.json();
        setTotalTrees(data.estimated_trees_central); // Atualiza o número total de árvores
        setTotalCarbon(Math.round(data.total_co2)); // Arredonda o valor de carbono sequestrado para um número inteiro
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
    <Box className="bg-white p-6 rounded-lg shadow-lg w-1/2">
      {isLoading ? (
        <Typography variant="h6" align="center">Carregando métricas...</Typography>
      ) : (
        <div className="flex justify-center space-x-6">
          {/* Exibe o número total de árvores e o carbono sequestrado */}
          <TreeNumber value={totalTrees !== null ? totalTrees : 'N/A'} label="TOTAL DE ÁRVORES" imageSrc="tree" />
          <TreeNumber value={totalCarbon !== null ? `${totalCarbon} KG` : 'N/A'} label="CARBONO SEQUESTRADO" imageSrc="carbono" />
        </div>
      )}
    </Box>
  );
};

export default TextGraph;
