import React, { useState } from 'react';

const ImageUpload: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Verificação para garantir que um arquivo foi selecionado
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      // A imagem está salva localmente em 'imageURL'
    }
  };

  return (
    <div>
      {/* Botão para abrir o popup */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-black text-white py-2 px-4 rounded-[8%] flex items-center hover:bg-gray-800"
      >
        <img
          src="../../assets/Upload cloud(1).png"
          alt="Upload Icon"
          className="h-6 w-6 mr-2"
        />
        Inserir Imagem
      </button>

      {/* Popup para upload da imagem */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Upload de Imagem</h2>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {selectedImage && (
              <div className="mt-4">
                <p>Imagem selecionada:</p>
                <img src={selectedImage} alt="Preview" className="mt-2 h-32 w-32 object-cover" />
              </div>
            )}

            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

// Linha extra para resolver o problema TS1208:
export {};
