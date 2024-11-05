import React, { useState } from 'react';

interface CompareImagesButtonProps {
  image1: string; // Caminho ou URL da primeira imagem
}

const CompareImagesButton: React.FC<CompareImagesButtonProps> = ({ image1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image2, setImage2] = useState<string | null>(null); // Estado para armazenar a segunda imagem obtida do backend
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento da imagem do backend

  const handleCompareImages = async () => {
    if (!image1) {
      alert('Por favor, selecione a primeira imagem.');
      return;
    }

    setIsLoading(true); // Inicia o estado de carregamento

    try {
      const response = await fetch("http://127.0.0.1:8000/processed-image"); // Insira a URL do backend aqui
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImage2(imageUrl); // Armazena a imagem do backend no estado
        setIsModalOpen(true); // Abre o modal após carregar a imagem
      } else {
        console.error("Erro ao buscar a imagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }

    setIsLoading(false); // Finaliza o carregamento
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <>
      {/* Botão de Comparar Imagens */}
      <button
        className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-300"
        onClick={handleCompareImages}
      >
        {isLoading ? 'Carregando...' : 'Comparar Imagens'}
      </button>

      {/* Modal de comparação de imagens */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full h-full max-w-full max-h-full overflow-auto relative">
            <h2 className="text-lg font-bold mb-4">Comparação de Imagens</h2>

            {/* Botão de Fechar no canto superior direito */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex space-x-4 justify-center items-center h-full">
              <img src={image1} alt="Imagem 1" className="w-1/2 h-auto object-contain max-h-full" />
              {image2 ? (
                <img src={image2} alt="Imagem 2" className="w-1/2 h-auto object-contain max-h-full" />
              ) : (
                <p>Carregando imagem 2...</p> // Exibe um texto enquanto a imagem 2 está sendo carregada
              )}
            </div>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareImagesButton;
