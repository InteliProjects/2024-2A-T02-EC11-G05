import React, { useState } from "react";
import UploadImage from "./components/imageupload/imageupload";
import MetricsButton from "./components/MetricsButton/MetricsButton";
import Heather from "../components/heather/heather";
import TextGraph from "./components/text_graph/text_graph";
import VelocimeterGraph from "./components/speed_graph/speed_graph";

const DashBoard: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backendImage, setBackendImage] = useState<string | null>(null); // Estado para armazenar a imagem do backend

  const handleImageUpload = (image: File) => {
    setSelectedImage(image);
  };

  const handleAnalyzeImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch("http://127.0.0.1:8000/processed-image"); // Insira a URL do backend aqui
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setBackendImage(imageUrl); // Armazena a imagem do backend no estado
          setIsModalOpen(true); // Abre o modal após carregar a imagem
        } else {
          console.error("Erro ao buscar a imagem:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    } else {
      alert("Por favor, insira uma imagem antes de analisar.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Heather />

      {/* Centralização e Espaçamento dos Gráficos */}
      <div className="flex justify-center items-center space-x-10 mt-12 mx-auto max-w-6xl">
        <VelocimeterGraph />
        <TextGraph />
      </div>

      {/* Seção dos Botões e Interações */}
      <div className="flex flex-col items-center justify-center pt-16 space-x-4">
        <div className="flex space-x-6">
          {/* Upload Image */}
          <UploadImage onImageUpload={handleImageUpload} />

          {/* Ampliar Imagem */}
          <button
            className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-300"
            onClick={handleAnalyzeImage}
          >
            Analisar Terreno
          </button>

          {/* Ver Métricas */}
          <MetricsButton />
        </div>
      </div>

      {/* Modal de Ampliar Imagem */}
      {isModalOpen && backendImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Análise de Imagem</h2>
            <img
              src={backendImage}
              alt="Imagem para análise"
              className="w-full h-auto object-contain"
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
