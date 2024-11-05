import React from 'react';
import CarbonCheckLogo from '../../../../assets/CARBON_CHECK-removebg-preview 2.png';
import AbundanceBrasilLogo from '../../../../assets/abundance_img.png';


const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo CarbonCheck */}
        <div className="flex items-center space-x-2">
          <img src={CarbonCheckLogo} alt="CarbonCheck" className="h-12 w-auto" />
        </div>

        {/* Logo Abundance Brasil */}
        <div className="flex items-center space-x-2">
          <img src={AbundanceBrasilLogo} alt="Abundance Brasil" className="h-12 w-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
