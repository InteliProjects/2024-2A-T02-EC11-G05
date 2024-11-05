import React, { useState } from 'react';

interface Metrics {
  total_co2: number;
  total_oxygen: number;
  total_water: number;
  total_soil: number;
  total_species: number;
  estimated_trees_min: number;
  estimated_trees_max: number;
  estimated_trees_central: number;
}

const MetricsButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null); // Armazena as métricas recebidas
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de carregamento

  const handleMetricsClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/metrics'); // URL da API
      if (response.ok) {
        const data = await response.json();
        setMetrics(data); // Armazena as métricas recebidas
        setIsModalOpen(true); // Abre o modal após receber as métricas
      } else {
        console.error('Erro ao buscar as métricas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div>
      <button
        onClick={handleMetricsClick}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-400 transition duration-300"
      >
        {isLoading ? 'Carregando...' : 'Ver Métricas'}
      </button>

      {isModalOpen && metrics && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <h2 className="text-lg font-bold mb-4">Métricas Ambientais</h2>
            <ul className="list-disc ml-5">
              <li>CO2 Sequestrado: {metrics.total_co2.toFixed(2)} kg por ano.</li>
              <li>Oxigênio Produzido: {metrics.total_oxygen.toFixed(2)} kg por ano.</li>
              <li>Água Retida: {metrics.total_water.toFixed(2)} litros por ano.</li>
              <li>Solo Preservado: {metrics.total_soil.toFixed(2)} kg por ano.</li>
              <li>Biodiversidade Suportada: {metrics.total_species.toFixed(2)} espécies.</li>
              <li>Número estimado de árvores: {metrics.estimated_trees_min} a {metrics.estimated_trees_max}, estimativa central: {metrics.estimated_trees_central}.</li>
            </ul>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsButton;
