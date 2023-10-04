import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Ball = (props) => {
  const { count } = props;
  const meshRef = useRef(null);
  const trajectory = useRef(new THREE.CurvePath()).current;
  const radius = 1;
  const [countState, setCountState] = useState(0);
  const handleStateClick = () => setCountState(countState + 1);

  useEffect(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      10, 10,
      0, 2 * Math.PI,
      false,
      0
    );

    const points = curve.getPoints(50);
    // for (let i = 0; i < points.length; i++) {
    //   const point = points[i];
    //   trajectory.add(new THREE.LineCurve3(new THREE.Vector3(point.x, point.y, 0), new THREE.Vector3(point.x, point.y, 0)));
    // }
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      trajectory.add(new THREE.LineCurve3(new THREE.Vector3(point.x, point.y, 0), new THREE.Vector3(nextPoint.x, nextPoint.y, 0)));
    }
  }, []);

  useEffect(() => {
    const point = trajectory.curves[count].v1;
    console.log(point);
    meshRef.current.position.set(point.x, point.y, point.z);
  }, [count]);
  // useFrame((state) => {
  //   const time = state.clock.getElapsedTime();
  //   const point = trajectory.getPointAt((time % 1));
  //   meshRef.current.position.set(point.x, point.y, point.z);
  // });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default Ball;

