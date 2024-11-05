// Importações necessárias
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleClick = (): void => {
    // Função para redirecionar para outra página
    navigate('/dashboard');
  };

  return (
    <button     
      onClick={handleClick} 
      className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
      
      style={{ backgroundImage: 'url(/path-to-your-background.jpg)', backgroundSize: 'cover' }}
    >
      Fazer upload
    </button>
  );
};

export default Button;
