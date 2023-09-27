import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Ball = () => {
  const meshRef = useRef();
  const trajectory = new THREE.CurvePath();
  const radius = 1;

  useEffect(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      10, 10,
      0, 2 * Math.PI,
      false,
      0
    );

    const points = curve.getPoints(50);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      trajectory.add(new THREE.LineCurve3(new THREE.Vector3(point.x, point.y, 0), new THREE.Vector3(point.x, point.y, 0)));
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current && trajectory) {
      const time = state.clock.getElapsedTime();
      const point = trajectory.getPointAt((time % 1));
      meshRef.current.position.set(point.x, point.y, point.z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default Ball;
