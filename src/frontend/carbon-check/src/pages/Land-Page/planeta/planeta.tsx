import React from "react";
import PlanetaImage from "./planeta.png"; // Ajuste o caminho se necessário
import Button from "../../components/button/button";

const Planeta: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-20 space-x-20">
      {/* Coluna com texto e botão alinhados */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl md:text-3xl mb-8 text-black text-center max-w-md">
          Apenas em um clique é possível fazer o upload de imagens capturadas
          por satélites. A partir dessas imagens, o sistema automatiza a
          contagem de árvores, fornecendo dados precisos e rápidos para a gestão
          ambiental e geração de créditos de carbono.
        </p>
        {/* Alinha o botão logo abaixo do texto */}
        <Button />
      </div>

      {/* Imagem à direita */}
      <div className="flex justify-center items-center h-screen">
        <img src={PlanetaImage} alt="Planeta" className="w-100 h-auto" />
      </div>
    </div>
  );
};

export default Planeta;
