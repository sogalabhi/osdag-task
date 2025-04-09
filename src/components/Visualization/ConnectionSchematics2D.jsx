import React from 'react';

const ConnectionSchematics2D = ({ inputs, results }) => {
  const renderBeam = () => {
    if (!inputs) return null;
    
    const beamHeight = inputs.beamSection === 'ISMB100' ? 20 : 
                      inputs.beamSection === 'ISMB150' ? 30 : 40;
    const flangeWidth = 15;

    return (
      <>
        {/* Left Beam */}
        <div className="absolute bg-blue-200 border border-blue-300" 
             style={{
               left: '10%',
               width: '30%',
               height: `${beamHeight}%`,
               top: `${50 - beamHeight/2}%`
             }}>
        </div>
        
        {/* Right Beam */}
        <div className="absolute bg-blue-200 border border-blue-300" 
             style={{
               left: '60%',
               width: '30%',
               height: `${beamHeight}%`,
               top: `${50 - beamHeight/2}%`
             }}>
        </div>
        
        {/* Splice Plates */}
        {results && (
          <div className="absolute bg-green-200 border border-green-300"
               style={{
                 left: '40%',
                 width: '20%',
                 height: `${beamHeight}%`,
                 top: `${50 - beamHeight/2}%`
               }}>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full h-full p-4">
      <div className="relative h-full">
        {inputs ? (
          <>
            <h3 className="text-center mb-2">Beam Splice Connection</h3>
            {renderBeam()}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Enter parameters to view connection
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionSchematics2D;