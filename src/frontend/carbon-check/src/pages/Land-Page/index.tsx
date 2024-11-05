import React from "react";
import BackgroundImageWithText from "./components/BackgroundImageWithText/BackgroundImageWithText";
import GradientBackground from "./components/GradientBackground/GradientBackground";
import Footer from "./components/footer/footer";
import Heather from "../components/heather/heather";

const LandPage: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <Heather />

      <div>
        <BackgroundImageWithText
          title="Transformamos a conservação ambiental através da tecnologia."
          text="Estamos na vanguarda da tokenização de florestas, gerando créditos de carbono que ajudam a manter as florestas de pé e a garantir um futuro sustentável para o planeta."
          buttonText="Fazer upload"
          onButtonClick={handleButtonClick}
        />
      </div>
      <div>
        <GradientBackground />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandPage;
