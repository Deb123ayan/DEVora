import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, Grid, Stars, Sparkles, Text, Line, Ring, Icosahedron } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingCode({ position, text }: { position: [number, number, number], text: string }) {
    const textRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (textRef.current) {
            textRef.current.position.y += Math.sin(clock.getElapsedTime() * 2) * 0.002;
            textRef.current.lookAt(0, 0, 10); // Look at camera roughly
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
                ref={textRef}
                position={position}
                fontSize={0.2}
                color="#00ffff"
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnF8RD8yKxTOlOV.woff"
                characters="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
                anchorX="center"
                anchorY="middle"
                maxWidth={10}
            >
                {text}
            </Text>
        </Float>
    );
}

function TechRing({ position, color, scale = 1, speed = 1 }: { position: [number, number, number], color: string, scale?: number, speed?: number }) {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * 0.2 * speed;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            <Ring args={[2, 2.05, 64]} renderOrder={1}>
                <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[1.8, 1.82, 32]} renderOrder={1}>
                 <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
            </Ring>
             {/* Tech notches */}
            {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 2, Math.sin(i * Math.PI / 4) * 2, 0]} rotation={[0, 0, i * Math.PI / 4]}>
                    <boxGeometry args={[0.2, 0.05, 0.05]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
    if (wireframeRef.current) {
        wireframeRef.current.rotation.x = -state.clock.getElapsedTime() * 0.1;
        wireframeRef.current.rotation.y = -state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group position={[2, 0, 0]}>
          <mesh ref={wireframeRef} scale={2.5}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial
              color="#8b2cf5"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
          <mesh ref={meshRef} scale={2}>
            <icosahedronGeometry args={[1, 4]} />
            <meshStandardMaterial
              color="#00ffff"
              wireframe
              transparent
              opacity={0.3}
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Core */}
          <mesh scale={1.2}>
             <icosahedronGeometry args={[1, 15]} />
             <MeshDistortMaterial
              color="#0a0a0a"
              attach="material"
              distort={0.4}
              speed={3}
              roughness={0.2}
              metalness={1}
            />
          </mesh>
      </group>
    </Float>
  );
}

function FloatingGeometry({ position, color, type }: { position: [number, number, number]; color: string, type: 'box' | 'torus' | 'cone' | 'oct' }) {
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
        case 'oct': return <octahedronGeometry args={[0.5]} />;
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
            metalness={0.9} 
            wireframe
            emissive={color}
            emissiveIntensity={0.5}
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
                args={[30, 30]} 
                cellSize={0.5} 
                cellThickness={0.5} 
                cellColor="#2a2a35" 
                sectionSize={2.5} 
                sectionThickness={1} 
                sectionColor="#8b2cf5" 
                fadeDistance={20} 
                fadeStrength={1} 
                infiniteGrid
            />
        </group>
    )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 5, 25]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#8b2cf5" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Engineering Elements */}
        <AnimatedSphere />
        
        {/* Floating Code Snippets */}
        <FloatingCode position={[-3, 2, -2]} text="<System.Init />" />
        <FloatingCode position={[3.5, -1.5, -1]} text="{ debug: true }" />
        <FloatingCode position={[-2.5, -2, 0]} text="npm run build" />
        
        {/* Tech Rings */}
        <TechRing position={[0, 0, -5]} color="#8b2cf5" scale={3} speed={0.5} />
        <TechRing position={[0, 0, -8]} color="#00ffff" scale={4} speed={-0.3} />

        {/* Floating Geo Artifacts */}
        <FloatingGeometry position={[-3.5, 0.5, -1]} color="#00ffff" type="oct" />
        <FloatingGeometry position={[-2, -1, 0.5]} color="#8b2cf5" type="box" />
        <FloatingGeometry position={[4, 2, -2]} color="#00ffff" type="cone" />
        
        <MovingGrid />
        
      </Canvas>
    </div>
  );
}
