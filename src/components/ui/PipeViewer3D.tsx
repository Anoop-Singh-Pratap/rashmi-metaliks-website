import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const PipeViewer3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add responsive dark mode support
    const updateBackgroundColor = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      scene.background = new THREE.Color(isDarkMode ? 0x1a1a1a : 0xf5f5f5);
    };
    updateBackgroundColor();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create pipe geometry
    const outerRadius = 1;
    const innerRadius = 0.8;
    const height = 4;
    const radialSegments = 32;
    
    // Create the outer cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(outerRadius, outerRadius, height, radialSegments);
    const pipeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xE53935,
      shininess: 70,
      specular: 0x333333,
      side: THREE.DoubleSide
    });
    const outerCylinder = new THREE.Mesh(cylinderGeometry, pipeMaterial);
    scene.add(outerCylinder);
    
    // Create the inner cylinder (hole)
    const holeCylinderGeometry = new THREE.CylinderGeometry(innerRadius, innerRadius, height + 0.2, radialSegments);
    const holeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111,
      side: THREE.DoubleSide
    });
    const innerCylinder = new THREE.Mesh(holeCylinderGeometry, holeMaterial);
    scene.add(innerCylinder);
    
    // Add pipe joints at the ends
    const jointRadius = 1.1;
    const jointHeight = 0.3;
    const jointGeometry = new THREE.CylinderGeometry(jointRadius, jointRadius, jointHeight, radialSegments);
    
    const topJoint = new THREE.Mesh(jointGeometry, pipeMaterial);
    topJoint.position.y = height / 2 - jointHeight / 2;
    scene.add(topJoint);
    
    const bottomJoint = new THREE.Mesh(jointGeometry, pipeMaterial);
    bottomJoint.position.y = -height / 2 + jointHeight / 2;
    scene.add(bottomJoint);
    
    // Controls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // Add automatic rotation
    let autoRotate = true;
    setTimeout(() => {
      autoRotate = false;
    }, 3000);
    
    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      
      if (autoRotate) {
        outerCylinder.rotation.y += 0.01;
        innerCylinder.rotation.y += 0.01;
        topJoint.rotation.y += 0.01;
        bottomJoint.rotation.y += 0.01;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateBackgroundColor();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px] md:h-[500px] rounded-xl border border-border shadow-lg overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
};

export default PipeViewer3D; 