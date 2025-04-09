import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createBeamModel } from './BeamModel';
import { createSplicePlates } from './SplicePlateModel';

const ConnectionVisualizer3D = ({ inputs, results }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create coordinate helper
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Create models
    const beamLeft = createBeamModel(inputs, 'left');
    beamLeft.rotation.y = Math.PI/2; // Align along Z-axis
    scene.add(beamLeft);

    const beamRight = createBeamModel(inputs, 'right');
    beamRight.rotation.y = Math.PI/2;
    scene.add(beamRight);

    if (results) {
      const { splicePlates, bolts } = createSplicePlates(inputs, results);
      splicePlates.rotation.y = Math.PI/2; // Align with beams
      scene.add(splicePlates);
      scene.add(bolts);
    }

    // Camera position
    camera.position.set(300, 200, 300);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [inputs, results]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ConnectionVisualizer3D;