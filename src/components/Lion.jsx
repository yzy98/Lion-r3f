import { useFrame } from "@react-three/fiber";
import { useRef, useContext } from "react";
import { WindContext } from "../contexts/WindContext";

const Lion = () => {
  return  (
    <Hair />
  );
};

const Hair = () => {
  // hair 4 x 4
  const hairArr = [...Array(16).keys()];

  const hairItems = hairArr.map(num => <HairCube key={num} idx={num} />);

  return (
    <>
      {hairItems}
    </>
  );
};

const HairCube = ({idx}) => {
  const width = 2;
  const height = 2;
  const depth = 0.2;

  const x = (idx % 4) * 2 + 1 - 4;
  const y = -(Math.floor(idx / 4)) * 2 - 1 + 4;
  const z = 0;

  const hairMesh = useRef(null);

  const wind = useContext(WindContext);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    if (wind) {
      hairMesh.current.position.z = Math.sin((elapsedTime + idx * 10) * 50) * 0.3;
    } else {
      if (hairMesh.current.position.z !== 0) {
        hairMesh.current.position.z = 0;
      }
    }
  });

  return (
    <mesh position={[x, y, z]} ref={hairMesh}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Lion;