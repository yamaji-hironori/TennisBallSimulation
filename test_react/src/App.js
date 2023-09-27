import React from 'react';
import { Canvas } from '@react-three/fiber';
import Ball from './components/Ball';

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ball />
    </Canvas>
  );
};

export default App;
