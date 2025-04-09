import * as THREE from 'three';

const beamDimensions = {
  ISMB100: { h: 100, bf: 75, tf: 5, tw: 3.2 },
  ISMB150: { h: 150, bf: 80, tf: 7.4, tw: 4.8 },
  ISMB200: { h: 200, bf: 100, tf: 10.8, tw: 5.7 }
};

export const createBeamModel = (inputs, side = 'left') => {
  const beam = beamDimensions[inputs.beamSection];
  const group = new THREE.Group();
  const material = new THREE.MeshPhongMaterial({ color: 0x4682b4 });
  
  // Segment length (half of total beam length)
  const segmentLength = 200; 

  // Web (vertical part)
  const webGeometry = new THREE.BoxGeometry(beam.tw, beam.h - 2*beam.tf, segmentLength);
  const web = new THREE.Mesh(webGeometry, material);
  web.position.z = side === 'left' ? -segmentLength/2 : segmentLength/2;
  group.add(web);

  // Top Flange
  const topFlangeGeometry = new THREE.BoxGeometry(beam.bf, beam.tf, segmentLength);
  const topFlange = new THREE.Mesh(topFlangeGeometry, material);
  topFlange.position.set(
    0,
    beam.h/2 - beam.tf/2,
    side === 'left' ? -segmentLength/2 : segmentLength/2
  );
  group.add(topFlange);

  // Bottom Flange
  const bottomFlange = new THREE.Mesh(topFlangeGeometry.clone(), material);
  bottomFlange.position.set(
    0,
    -beam.h/2 + beam.tf/2,
    side === 'left' ? -segmentLength/2 : segmentLength/2
  );
  group.add(bottomFlange);

  return group;
};