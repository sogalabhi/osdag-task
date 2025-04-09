import * as THREE from 'three';

export const createSplicePlates = (inputs, results) => {
  const beam = {
    ISMB100: { h: 100, bf: 75, tf: 5 },
    ISMB150: { h: 150, bf: 80, tf: 7.4 },
    ISMB200: { h: 200, bf: 100, tf: 10.8 }
  }[inputs.beamSection];

  const plateGroup = new THREE.Group();
  const boltGroup = new THREE.Group();
  
  const plateMaterial = new THREE.MeshPhongMaterial({ color: 0x32cd32 });
  const boltMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });

  // Web Splice Plate (vertical)
  const webPlateGeometry = new THREE.BoxGeometry(
    results.webPlate.thickness,
    beam.h - 2*beam.tf,
    results.webPlate.width
  );
  const webPlate = new THREE.Mesh(webPlateGeometry, plateMaterial);
  plateGroup.add(webPlate);

  // Flange Splice Plates (horizontal)
  const flangePlateGeometry = new THREE.BoxGeometry(
    results.flangePlate.width,
    results.flangePlate.thickness,
    results.flangePlate.length
  );

  // Top Flange Plate
  const topPlate = new THREE.Mesh(flangePlateGeometry, plateMaterial);
  topPlate.position.set(
    0,
    beam.h/2,
    0
  );
  plateGroup.add(topPlate);

  // Bottom Flange Plate
  const bottomPlate = new THREE.Mesh(flangePlateGeometry, plateMaterial);
  bottomPlate.position.set(
    0,
    -beam.h/2,
    0
  );
  plateGroup.add(bottomPlate);

  // Bolts
  const boltGeometry = new THREE.CylinderGeometry(
    inputs.boltDiameter/2,
    inputs.boltDiameter/2,
    results.webPlate.thickness * 2,
    16
  );

  // Bolt positions
  const boltPositions = [
    // Web bolts
    { x: 0, y: (beam.h - 2*beam.tf)/3, z: 0 },
    { x: 0, y: -(beam.h - 2*beam.tf)/3, z: 0 },
    // Top flange bolts
    { x: results.flangePlate.width/3, y: beam.h/2, z: 0 },
    { x: -results.flangePlate.width/3, y: beam.h/2, z: 0 },
    // Bottom flange bolts
    { x: results.flangePlate.width/3, y: -beam.h/2, z: 0 },
    { x: -results.flangePlate.width/3, y: -beam.h/2, z: 0 }
  ];

  boltPositions.forEach(pos => {
    const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
    bolt.rotation.z = Math.PI/2; // Horizontal orientation
    bolt.position.set(pos.x, pos.y, pos.z);
    boltGroup.add(bolt);
  });

  return { splicePlates: plateGroup, bolts: boltGroup };
};