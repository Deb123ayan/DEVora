import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, Grid, Stars, Sparkles, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={2}>
        <icosahedronGeometry args={[1, 4]} /> {/* Lower detail for wireframe look */}
        <meshStandardMaterial
          color="#8b2cf5"
          wireframe
          transparent
          opacity={0.3}
          emissive="#8b2cf5"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Inner solid core */}
      <mesh position={[2, 0, 0]} scale={1.2}>
         <icosahedronGeometry args={[1, 15]} />
         <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.1}
          metalness={1}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function FloatingGeometry({ position, color, type }: { position: [number, number, number]; color: string, type: 'box' | 'torus' | 'cone' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  const Geometry = useMemo(() => {
    switch(type) {
        case 'box': return <boxGeometry args={[0.5, 0.5, 0.5]} />;
        case 'torus': return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
        case 'cone': return <coneGeometry args={[0.3, 0.6, 32]} />;
        default: return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  }, [type]);

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {Geometry}
        <meshPhysicalMaterial 
            color={color} 
            roughness={0} 
            metalness={0.8} 
            transmission={0.5} 
            thickness={1}
            clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

function MovingGrid() {
    const gridRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(gridRef.current) {
            gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1;
        }
    })
    return (
        <group rotation={[Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
            <Grid 
                ref={gridRef}
                args={[20, 20]} 
                cellSize={0.5} 
                cellThickness={0.5} 
                cellColor="#8b2cf5" 
                sectionSize={2} 
                sectionThickness={1} 
                sectionColor="#00ffff" 
                fadeDistance={15} 
                fadeStrength={1} 
                infiniteGrid
            />
        </group>
    )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#8b2cf5" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#ffffff" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#00ffff" />

        <AnimatedSphere />
        
        <FloatingGeometry position={[-2.5, 1.5, -1]} color="#00ffff" type="torus" />
        <FloatingGeometry position={[-2, -1, 0.5]} color="#8b2cf5" type="box" />
        <FloatingGeometry position={[3.5, 2, -2]} color="#00ffff" type="cone" />
        <FloatingGeometry position={[1.5, -2.5, -1]} color="#8b2cf5" type="torus" />
        
        <MovingGrid />
        
      </Canvas>
    </div>
  );
}
