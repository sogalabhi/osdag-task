import React from 'react';

const ForceInputs = ({ bendingMoment, shearForce, axialForce, onChange, className }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="font-medium text-gray-700">Loading Conditions</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Bending Moment (kNm)</label>
        <input
          type="number"
          value={bendingMoment}
          onChange={(e) => onChange('bendingMoment', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Shear Force (kN)</label>
        <input
          type="number"
          value={shearForce}
          onChange={(e) => onChange('shearForce', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Axial Force (kN)</label>
        <input
          type="number"
          value={axialForce}
          onChange={(e) => onChange('axialForce', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ForceInputs;