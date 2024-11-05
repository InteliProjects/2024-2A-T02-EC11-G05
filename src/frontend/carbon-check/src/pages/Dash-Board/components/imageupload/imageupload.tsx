import React, { ChangeEvent } from "react";

interface UploadImageProps {
  onImageUpload: (image: File) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      onImageUpload(imageFile); // Obtém o primeiro arquivo selecionado

      // Criar um FormData para enviar a imagem
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const response = await fetch("http://127.0.0.1:8000/segment", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Imagem enviada com sucesso:", data);
        } else {
          console.error("Erro ao enviar a imagem:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    }
  };

  return (
    <div>
      <label className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-300 cursor-pointer">
        Inserir Imagem
        <input
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default UploadImage;
