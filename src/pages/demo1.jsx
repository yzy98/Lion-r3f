import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Lion from '../components/Lion';
import { WindContextProvider } from '../contexts/WindContext';

const Demo1 = () => {
  const [wind, setWind] = useState(false);

  const handleClickStart = () => {
    setWind(true);
  };

  const handleClickEnd = () => {
    setWind(false);
  };

  return (
    <WindContextProvider wind={wind}>
      <Canvas 
        camera={{ position: [0, 2, 10] }} 
        onMouseDown={handleClickStart}
        onMouseUp={handleClickEnd}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="#ffffff" position={[0, 0, 5]} />
        <Lion />
      </Canvas>
    </WindContextProvider>
  );
};

export default Demo1;