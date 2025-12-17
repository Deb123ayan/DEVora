import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, Grid, Stars, Text, Line, Ring, Box, Cylinder } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function FloatingCode({ position, text }: { position: [number, number, number], text: string }) {
    const textRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (textRef.current) {
            textRef.current.position.y += Math.sin(clock.getElapsedTime() * 2) * 0.002;
            textRef.current.lookAt(0, 0, 10);
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
                ref={textRef}
                position={position}
                fontSize={0.2}
                color="#00ffff"
                // Using a standard font to avoid loading issues if the custom one fails
                font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2" 
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
            <Ring args={[2, 2.05, 32]} renderOrder={1}>
                <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[1.8, 1.82, 32]} renderOrder={1}>
                 <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
            </Ring>
        </group>
    );
}

function ServerRack({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <Box args={[0.8, 2.5, 0.8]} position={[0, 1.25, 0]}>
                <meshStandardMaterial color="#1a1a20" roughness={0.2} metalness={0.8} />
            </Box>
            {[...Array(6)].map((_, i) => (
                <Box key={i} args={[0.7, 0.05, 0.75]} position={[0, 0.3 + i * 0.4, 0]}>
                     <meshStandardMaterial color="#333" />
                </Box>
            ))}
        </group>
    );
}

function DataStream({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
    return (
        <Line
            points={points}
            color={color}
            lineWidth={1}
            opacity={0.5}
            transparent
        />
    );
}

function DatabaseNode({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                {[0, 0.4, 0.8].map((y, i) => (
                    <Cylinder key={i} args={[0.6, 0.6, 0.3, 16]} position={[0, y, 0]}>
                        <meshStandardMaterial color="#2a2a35" metalness={0.8} roughness={0.2} />
                    </Cylinder>
                ))}
            </group>
        </Float>
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
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#8b2cf5"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
          <mesh ref={meshRef} scale={2}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial
              color="#00ffff"
              wireframe
              transparent
              opacity={0.3}
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh scale={1.2}>
             <icosahedronGeometry args={[1, 4]} />
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
                args={[40, 40]} 
                cellSize={0.5} 
                cellThickness={0.5} 
                cellColor="#2a2a35" 
                sectionSize={2.5} 
                sectionThickness={1} 
                sectionColor="#8b2cf5" 
                fadeDistance={25} 
                fadeStrength={1} 
                infiniteGrid
            />
        </group>
    )
}

function FallbackCube() {
    // Simple rotating cube to verify rendering works if everything else fails
    const ref = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if(ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    });
    return (
        <mesh ref={ref} position={[-4, 3, -5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe />
        </mesh>
    );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas 
        dpr={[1, 2]} 
        resize={{ scroll: false }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
            <color attach="background" args={['#030305']} />
            <fog attach="fog" args={['#030305', 5, 30]} />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
            <pointLight position={[-10, -5, -10]} intensity={2} color="#8b2cf5" />
            
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            
            <AnimatedSphere />
            
            <FloatingCode position={[-3, 2.5, -2]} text="<System.Init />" />
            <FloatingCode position={[3.5, -1.5, -1]} text="{ debug: true }" />
            <FloatingCode position={[-2.5, -2, 0]} text="npm run deploy" />

            <group position={[-5, -1, -5]}>
                <ServerRack position={[0, 0, 0]} />
                <ServerRack position={[1.5, 0, 0.5]} />
            </group>

            <group position={[5, -0.5, -4]}>
                <DatabaseNode position={[0, 0, 0]} />
            </group>

            <DataStream start={[-5, 1, -5]} end={[2, 0, 0]} color="#8b2cf5" />
            <DataStream start={[5, 1, -4]} end={[2, 0, 0]} color="#00ffff" />
            
            <TechRing position={[0, 0, -5]} color="#8b2cf5" scale={3} speed={0.5} />
            <TechRing position={[0, 0, -8]} color="#00ffff" scale={4} speed={-0.3} />
            
            <MovingGrid />
            
            {/* Debug Element - if user sees red cube, canvas is working */}
            <FallbackCube />
        </Suspense>
      </Canvas>
    </div>
  );
}
