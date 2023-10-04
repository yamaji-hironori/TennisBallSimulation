import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Ball from './components/Ball';

const App = () => {
  const [countState, setCountState] = useState(0);
  const handleStateClick = () => setCountState(countState + 1);

  return (
    <div>
      <button onClick={handleStateClick}>Change State: {countState}</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ball count={countState} />
      </Canvas>
    </div>
  );
};

export default App;
