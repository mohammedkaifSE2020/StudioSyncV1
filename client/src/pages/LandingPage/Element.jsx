import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GradientTube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    try {
      // Initialize Scene, Camera, and Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(600, 600);
      mountRef.current.appendChild(renderer.domElement);

      // Create Torus Knot Geometry
      const geometry = new THREE.TorusKnotGeometry(15, 7, 100, 100);

      // Add Gradient Colors
      const colors = [];
      const colorStart = new THREE.Color(0x63039c); // Purple
      const colorEnd = new THREE.Color(0x3993a7); // Teal

      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const factor = i / geometry.attributes.position.count;
        const interpolatedColor = colorStart.clone().lerp(colorEnd, factor);
        colors.push(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      // Create Material Supporting Vertex Colors
      const material = new THREE.MeshNormalMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Set Camera Position
      camera.position.z = 50;

      // Access positions and normals
      const positions = geometry.attributes.position;
      const normals = geometry.attributes.normal;
      const originalPositions = positions.array.slice();

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the torus knot
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        const time = Date.now() * 0.001;

        // Total vertices count
        const totalCount = positions.count;

        // Calculate chunk size for 30%
        const chunkSize = Math.floor(totalCount * 0.3);

        // Update vertex positions for each chunk
        for (let chunk = 0; chunk < 3; chunk++) {
          const start = chunk * chunkSize;
          const end = start + chunkSize;

          // Sinusoidal scale for the chunk
          const scale = 1 + 0.3 * Math.sin(time + chunk * (Math.PI / 3));

          for (let i = start; i < end; i++) {
            const x = originalPositions[i * 3];
            const y = originalPositions[i * 3 + 1];
            const z = originalPositions[i * 3 + 2];

            // Get normal vector
            const nx = normals.getX(i);
            const ny = normals.getY(i);
            const nz = normals.getZ(i);

            // Expand along the normal
            const expandedX = x + nx * (scale - 1) * 5; // Adjust the multiplier for stronger expansion
            const expandedY = y + ny * (scale - 1) * 5;
            const expandedZ = z + nz * (scale - 1) * 5;

            positions.setXYZ(i, expandedX, expandedY, expandedZ);
          }
        }

        positions.needsUpdate = true; // Inform Three.js that positions have been updated

        renderer.render(scene, camera);
      };

      animate();
    } catch (error) {
      console.error("Error occurred:", error);
    }

    // Cleanup on Unmount
    return () => {
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default GradientTube;
