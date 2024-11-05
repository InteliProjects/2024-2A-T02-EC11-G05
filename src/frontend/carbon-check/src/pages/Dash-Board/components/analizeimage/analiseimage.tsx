import React, { useState } from 'react';

interface AnalizeImageProps {
  image: string;
}

const AnalizeImage: React.FC<AnalizeImageProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={openModal}
        className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition duration-300"
      >
        Ampliar Imagem
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative">
            <img src={image} alt="Imagem ampliada" className="w-full h-auto object-contain" />
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

export default AnalizeImage;
