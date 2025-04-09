import React from 'react';

const CapacityDisplay = ({ 
  bendingCapacity, 
  shearCapacity,
  demandBending,
  demandShear,
  className 
}) => {
  const bendingStatus = parseFloat(demandBending) <= parseFloat(bendingCapacity) ? 'OK' : 'FAIL';
  const shearStatus = parseFloat(demandShear) <= parseFloat(shearCapacity) ? 'OK' : 'FAIL';

  return (
    <div className={`border rounded p-3 ${className}`}>
      <h3 className="font-medium mb-2">Member Capacity</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-sm text-gray-600">Bending (kNm)</div>
          <div className={`p-2 rounded ${
            bendingStatus === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {bendingCapacity}
            <div className="text-xs">Demand: {demandBending}</div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Shear (kN)</div>
          <div className={`p-2 rounded ${
            shearStatus === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {shearCapacity}
            <div className="text-xs">Demand: {demandShear}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityDisplay;