import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Lion from '../components/Lion';
import { WindContextProvider } from '../contexts/WindContext';
import { styled } from 'styled-components';

const CanvasContainer = styled.div`
  width: 1000px;
  height: 1000px;
`;

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
      <CanvasContainer>
        <Canvas
          flat
          linear
          camera={{ position: [0, 0, 30] }} 
          onMouseDown={handleClickStart}
          onMouseUp={handleClickEnd}
        >
          <ambientLight intensity={0.5} />
          <directionalLight color="#ffffff" position={[5, 5, 5]} />
          <Lion />
        </Canvas>
      </CanvasContainer>
    </WindContextProvider>
  );
};

export default Demo1;