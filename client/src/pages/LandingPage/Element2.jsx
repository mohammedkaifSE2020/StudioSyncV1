import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Element2 = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    try {
      // Basic Setup: Scene, Camera, Renderer
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

      // Define Custom Curve for Tube Geometry
      class CustomSinCurve extends THREE.Curve {
        constructor(scale = 1) {
          super();
          this.scale = scale;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {
          const tx = t * 3 - 1.5;
          const ty = Math.sin(2 * Math.PI * t);
          const tz = 0;
          return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
        }
      }

      const curve = new CustomSinCurve(10);

      // Geometry Options
      const geometryOptions = {
        tubularSegments: 100,
        radius: 5,
        radialSegments: 20,
        closed: false,
      };
      const geometry = new THREE.TubeGeometry(
        curve,
        geometryOptions.tubularSegments,
        geometryOptions.radius,
        geometryOptions.radialSegments,
        geometryOptions.closed
      );

      // Gradient Colors
      const gradientColors = {
        start: new THREE.Color(0x63039c), // Purple
        end: new THREE.Color(0x3993a7), // Teal
      };

      // Generate Gradient Colors for Vertices
      const colors = [];
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const factor = i / geometry.attributes.position.count;
        const interpolatedColor = gradientColors.start
          .clone()
          .lerp(gradientColors.end, factor);
        colors.push(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
      }
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      // Create Material with Vertex Colors
      const material = new THREE.MeshNormalMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      // Create Mesh and Add to Scene
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Set Camera Position
      camera.position.z = 50;

      // Compute Normals for Geometry
      geometry.computeVertexNormals();
      const positions = geometry.attributes.position;
      const normals = geometry.attributes.normal;
      const originalPositions = positions.array.slice();

      // Animation Function
      const animate = () => {
        requestAnimationFrame(animate);

        // Optional: Add rotation
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        const time = Date.now() * 0.001;
        const totalCount = positions.count;
        const chunkSize = Math.floor(totalCount * 0.3);

        // Update Vertex Positions for Expansion
        for (let chunk = 0; chunk < 3; chunk++) {
          const start = chunk * chunkSize;
          const end = Math.min(start + chunkSize, totalCount);
          const scale = 1 + 0.7 * Math.sin(time + chunk * Math.PI / 3);

          for (let i = start; i < end; i++) {
            const x = originalPositions[i * 3];
            const y = originalPositions[i * 3 + 1];
            const z = originalPositions[i * 3 + 2];

            const nx = normals.getX(i);
            const ny = normals.getY(i);
            const nz = normals.getZ(i);

            positions.setXYZ(
              i,
              x + nx * (scale - 1),
              y + ny * (scale - 1),
              z + nz * (scale - 1)
            );
          }
        }

        // Mark Positions as Updated
        positions.needsUpdate = true;

        // Render Scene
        renderer.render(scene, camera);
      };

      animate();
    } catch (error) {
      console.error("Error occurred while rendering:", error);
    }

    // Cleanup Resources on Unmount
    return () => {
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Element2;
