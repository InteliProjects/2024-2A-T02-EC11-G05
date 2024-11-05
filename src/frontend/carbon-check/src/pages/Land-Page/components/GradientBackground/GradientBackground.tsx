import React from "react";
import Broto from "../broto/broto";
import Planeta from "../../planeta/planeta";

const GradientBackground: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-500">
      <div className="flex flex-col items-center justify-center space-y-16">
        <Broto />
      </div>
      <div className="flex items-center justify-center">
        <Planeta />
      </div>
    </div>
  );
};

export default GradientBackground;
