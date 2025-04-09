import React from 'react';
import CapacityDisplay from './CapacityDisplay';
import BoltDetails from './BoltDetails';

const OutputDock = ({ results }) => {
  if (!results) {
    return (
      <div className="w-80 bg-white border-l border-gray-300 p-4 overflow-y-auto">
        <div className="text-center text-gray-500 py-8">
          <p>Design the connection to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-300 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Design Results</h2>
      
      <CapacityDisplay 
        bendingCapacity={results.memberCapacity.bending} 
        shearCapacity={results.memberCapacity.shear}
        demandBending={results.demand.bending}
        demandShear={results.demand.shear}
      />
      
      <BoltDetails 
        diameter={results.boltDetails.diameter}
        boltClass={results.boltClass}
        flangeCapacity={results.boltDetails.flangeCapacity}
        webCapacity={results.boltDetails.webCapacity}
        className="mt-4"
      />
      
      <div className="mt-4 border rounded p-3">
        <h3 className="font-medium mb-2">Connection Details</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-600">Web Plate Thickness</div>
            <div className="font-medium">{results.webPlate.thickness} mm</div>
          </div>
          <div>
            <div className="text-gray-600">Flange Plate Thickness</div>
            <div className="font-medium">{results.flangePlate.thickness} mm</div>
          </div>
          <div>
            <div className="text-gray-600">Bolt Spacing</div>
            <div className="font-medium">{results.boltDetails.spacing} mm</div>
          </div>
          <div>
            <div className="text-gray-600">Edge Distance</div>
            <div className="font-medium">{results.boltDetails.edgeDistance} mm</div>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition">
        Generate Design Report
      </button>
    </div>
  );
};

export default OutputDock;