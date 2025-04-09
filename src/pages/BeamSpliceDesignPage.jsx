import React, { useState } from 'react';
import InputDock from '../components/InputDock/InputDock';
import ConnectionVisualizer3D from '../components/Visualization/ConnectionVisualizer3D';
import ConnectionSchematics2D from '../components/Visualization/ConnectionSchematics2D';
import OutputDock from '../components/OutputDock/OutputDock';

const BeamSpliceDesignPage = () => {
    // State for design inputs
    const [inputs, setInputs] = useState({
        beamSection: 'ISMB200',
        material: 'Fe410',
        bendingMoment: 45,
        shearForce: 120,
        axialForce: 15,
        boltDiameter: 20,
        boltClass: '8.8',
        webThickness: 8
    });

    // State for design results
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState('3D');

    // Generate dummy results based on inputs
    const generateDummyResults = (inputValues) => {
        const beamHeight = inputValues.beamSection === 'ISMB100' ? 100 :
            inputValues.beamSection === 'ISMB150' ? 150 : 200;
        const flangeWidth = inputValues.beamSection === 'ISMB100' ? 75 :
            inputValues.beamSection === 'ISMB150' ? 80 : 100;

        return {
            memberCapacity: {
                bending: Math.round(beamHeight * flangeWidth * 0.1),
                shear: Math.round(beamHeight * 5)
            },
            demand: {
                bending: inputValues.bendingMoment,
                shear: inputValues.shearForce
            },
            boltDetails: {
                diameter: inputValues.boltDiameter,
                spacing: 70,
                edgeDistance: 40,
                flangeCapacity: {
                    value: Math.round(inputValues.boltDiameter * 20),
                    utilization: Math.min(1, inputValues.bendingMoment / (inputValues.boltDiameter * 20))
                },
                webCapacity: {
                    value: Math.round(inputValues.boltDiameter * 15),
                    utilization: Math.min(1, inputValues.shearForce / (inputValues.boltDiameter * 15))
                }
            },
            webPlate: {
                height: beamHeight - 20,
                width: 100,
                thickness: inputValues.webThickness,
                spacing: 70
            },
            flangePlate: {
                width: flangeWidth,
                length: flangeWidth + 40,
                thickness: inputValues.beamSection === 'ISMB100' ? 5 :
                    inputValues.beamSection === 'ISMB150' ? 7 : 10
            },
            designStatus: {
                bending: inputValues.bendingMoment < beamHeight * flangeWidth * 0.1 ? 'OK' : 'FAIL',
                shear: inputValues.shearForce < beamHeight * 5 ? 'OK' : 'FAIL'
            }
        };
    };

    // Handle design calculation
    const handleDesign = () => {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setResults(generateDummyResults(inputs));
            setIsLoading(false);
        }, 1000);
    };

    // Handle input changes
    const handleInputChange = (name, value) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    // Reset design
    const handleReset = () => {
        setInputs({
            beamSection: 'ISMB200',
            material: 'Fe410',
            bendingMoment: 45,
            shearForce: 120,
            axialForce: 15,
            boltDiameter: 20,
            boltClass: '8.8',
            webThickness: 8
        });
        setResults(null);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-800 text-white p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Osdag - Beam Splice Connection Design</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode('3D')}
                            className={`px-3 py-1 rounded ${viewMode === '3D' ? 'bg-white text-blue-800' : 'bg-blue-700'}`}
                        >
                            3D View
                        </button>
                        <button
                            onClick={() => setViewMode('2D')}
                            className={`px-3 py-1 rounded ${viewMode === '2D' ? 'bg-white text-blue-800' : 'bg-blue-700'}`}
                        >
                            2D Schematics
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Input Panel */}
                <div className="w-80 bg-white border-r border-gray-300 overflow-y-auto">
                    <InputDock
                        inputs={inputs}
                        onInputChange={handleInputChange}
                        onDesign={handleDesign}
                        onReset={handleReset}
                        isLoading={isLoading}
                    />
                </div>

                {/* Visualization Area */}
                <div className="flex-1 bg-gray-50 overflow-hidden">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
                                <p className="mt-4 text-gray-700">Generating design...</p>
                            </div>
                        </div>
                    ) : viewMode === '3D' ? (
                        <ConnectionVisualizer3D inputs={inputs} results={results} />
                    ) : (
                        <ConnectionSchematics2D inputs={inputs} results={results} />
                    )}
                </div>

                {/* Output Panel */}
                <div className="w-80 bg-white border-l border-gray-300 overflow-y-auto">
                    <OutputDock
                        results={results}
                        onCreateReport={() => alert('Generating design report...')}
                        onSaveOutput={() => alert('Saving design outputs...')}
                    />
                </div>
            </div>

            {/* Status Bar */}
            <footer className="bg-gray-200 p-2 text-sm text-gray-700 border-t border-gray-300">
                <div className="flex justify-between">
                    <span>
                        {inputs.beamSection ? `Beam: ${inputs.beamSection.replace('ISMB', 'ISMB ')}` : 'No section selected'}
                    </span>
                    <span>
                        Status: {results ? (
                            results.designStatus.bending === 'OK' && results.designStatus.shear === 'OK' ? (
                                <span className="text-green-600">Design OK</span>
                            ) : (
                                <span className="text-red-600">Checks Failed</span>
                            )
                        ) : (
                            <span>Ready for design</span>
                        )}
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default BeamSpliceDesignPage;