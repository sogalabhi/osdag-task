import React from 'react';

const BoltDetails = ({
    diameter,
    boltClass,
    flangeCapacity,
    webCapacity,
    className
}) => {
    return (
        <div className={`border rounded p-3 ${className}`}>
            <h3 className="font-medium mb-2">Bolt Details</h3>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                    <div className="text-sm text-gray-600">Diameter</div>
                    <div className="p-1 bg-gray-100 rounded">{diameter} mm</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Class</div>
                    <div className="p-1 bg-gray-100 rounded">{boltClass}</div>
                </div>
            </div>

            <div>
                <div className="text-sm text-gray-600">Flange Bolt Capacity (kN)</div>
                <div className="p-2 bg-green-100 text-green-800 rounded">
                    {flangeCapacity.value} ({(flangeCapacity.utilization * 100).toFixed(1)}% utilized)
                </div>
            </div>

            <div className="mt-2">
                <div className="text-sm text-gray-600">Web Bolt Capacity (kN)</div>
                <div className="p-2 bg-green-100 text-green-800 rounded">
                    {webCapacity.value} ({(webCapacity.utilization * 100).toFixed(1)}% utilized)
                </div>
            </div>
        </div>
    );
};

export default BoltDetails;