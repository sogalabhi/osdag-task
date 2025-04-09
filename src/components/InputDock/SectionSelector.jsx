import React from 'react';

const SectionSelector = ({ section, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Beam Section</label>
      <select
        value={section}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="ISMB100">ISMB 100</option>
        <option value="ISMB150">ISMB 150</option>
        <option value="ISMB200">ISMB 200</option>
        <option value="ISMB250">ISMB 250</option>
        <option value="ISMB300">ISMB 300</option>
      </select>
      
      {section && (
        <div className="mt-2 text-xs text-gray-600">
          Selected: {section.replace('ISMB', 'ISMB ')} mm
        </div>
      )}
    </div>
  );
};

export default SectionSelector;