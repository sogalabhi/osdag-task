import React from 'react';
import SectionSelector from './SectionSelector';
import ForceInputs from './ForceInputs';

const InputDock = ({ inputs, onInputChange, onDesign }) => {
  return (
    <div className="w-80 bg-white border-r border-gray-300 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Design Inputs</h2>
      
      <SectionSelector 
        section={inputs.beamSection} 
        onChange={(val) => onInputChange('beamSection', val)} 
      />
      
      <ForceInputs
        bendingMoment={inputs.bendingMoment}
        shearForce={inputs.shearForce}
        axialForce={inputs.axialForce}
        onChange={onInputChange}
        className="mt-4"
      />
      
      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Bolt Diameter (mm)</label>
          <select
            value={inputs.boltDiameter}
            onChange={(e) => onInputChange('boltDiameter', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="16">16 mm</option>
            <option value="20">20 mm</option>
            <option value="24">24 mm</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Web Thickness (mm)</label>
          <input
            type="number"
            value={inputs.webThickness}
            onChange={(e) => onInputChange('webThickness', e.target.value)}
            className="w-full p-2 border rounded"
            min="6"
            max="20"
          />
        </div>
      </div>
      
      <button 
        onClick={onDesign}
        className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        Design Connection
      </button>
    </div>
  );
};

export default InputDock;