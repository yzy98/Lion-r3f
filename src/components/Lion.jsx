import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useRef, useContext } from "react";
import { WindContext } from "../contexts/WindContext";
import { lionBlack, lionBrown, lionRed, lionWhite, lionYellow } from "../color";

const Lion = () => {
  const lionRef = useRef(null);

  useFrame(({mouse, viewport}) => {
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    lionRef.current.lookAt(x, y, 5);
  });

  return  (
    <group ref={lionRef}>
      <Hair />
      <Head />
    </group>
  );
};

/**
 * Hair 
 */
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

/**
 * Hair cube single
 */
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
      <meshStandardMaterial color={lionRed} />
    </mesh>
  );
};


const Head = () => {
  const ears = ['left', 'right'].map((pos, index) => <Ear key={index} pos={pos} />);
  const eyes = ['left', 'right'].map((pos, index) => <Eye key={index} pos={pos} />);

  return (
    <group>
      {/* face */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color={lionYellow} />
      </mesh>
      {/* nose */}
      <mesh position={[0, 1.3, 4]}>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color={lionBrown} />
      </mesh>
      {/* chin */}
      <mesh position={[0, -2.3, 3.5]}>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial color={lionYellow} />
      </mesh>
      {ears}
      {eyes}
    </group>
  );
};

const Ear = ({pos}) => {
  const isBlowing = useContext(WindContext);
  const earRef = useRef(null);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    if (isBlowing) {
      earRef.current.rotation.x = Math.sin(elapsedTime * 30) * 0.1 * Math.PI;
    } else {
      earRef.current.rotation.x = 0;
    }
  });

  return (
    <mesh 
      ref={earRef}
      position={pos === 'left' ? [-2.2, 2.5, 0.5] : [2.2, 2.5, 0.5]}
    >
      <boxGeometry args={[1]} />
      <meshStandardMaterial color={lionYellow} />
    </mesh>
  );
};

const Eye = ({pos}) => {
  const isBlowing = useContext(WindContext);
  const { 
    scaleWhite,
    scaleBlack,
    positionWhite,
    positionBlack
  } = useSpring({ 
    scaleWhite : isBlowing ? [1, 0.1, 1] : [1, 1, 1],
    scaleBlack : isBlowing ? [3, 0.3, 1] : [1, 1, 1],
    positionWhite: isBlowing ? [0, 0.2, 0] : [0, 0, 0],
    positionBlack: isBlowing ? [0, 0, 0] : [0.6, 0, 0]
  });

  return (
    <group
      rotation={[0, -Math.PI / 2, 0]}
      position={pos === 'left' ? [-2.1, 1.2, 1.2] : [2.1, 1.2, 1.2]}
    >
      <animated.mesh scale={scaleWhite} position={positionWhite}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color={lionWhite
        } />
      </animated.mesh>
      <animated.mesh scale={scaleBlack} position={positionBlack}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color={lionBlack} />
      </animated.mesh>
    </group>
  );
};

const Mustache = () => {};

const Mouth = () => {};

export default Lion;