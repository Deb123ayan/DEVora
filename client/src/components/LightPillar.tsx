import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  pillarRotation?: number;
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = '',
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  pillarRotation = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const timeRef = useRef<number>(0);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isLowPerformance, setIsLowPerformance] = useState<boolean>(false);

  // Check WebGL support and performance
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      console.warn('WebGL is not supported in this browser');
      return;
    }
    
    // Simple performance check
    const isMobile = window.innerWidth < 768;
    const isSlowDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
    setIsLowPerformance(isMobile && isSlowDevice);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Mobile optimization - reduce quality on smaller screens
    const isMobile = width < 768;
    const pixelRatio = isMobile ? 0.75 : 1; // Further reduced for mobile

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false, // Always disabled for performance
        alpha: true,
        powerPreference: 'default', // Use default for better compatibility
        precision: 'lowp',
        stencil: false,
        depth: false
      });
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Convert hex colors to RGB
    const parseColor = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // Shader material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;

      mat2 rot(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      // Simplified noise function
      float noise(vec2 coord) {
        return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
      }

      // Simplified wave deformation
      vec3 applyWaveDeformation(vec3 pos, float timeOffset) {
        vec3 deformed = pos;
        deformed.xz *= rot(0.3);
        vec3 oscillation = cos(deformed.zxy * 1.0 - timeOffset);
        deformed += oscillation * 0.5;
        return deformed;
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));
        float maxDepth = 30.0; // Reduced from 50.0
        float depth = 0.1;
        
        mat2 rotX = rot(uTime * 0.2); // Slower rotation
        
        vec3 color = vec3(0.0);
        
        // Reduced ray marching steps for better performance
        float maxSteps = uResolution.x < 768.0 ? 25.0 : 40.0; // Reduced from 50/100
        
        for(float i = 0.0; i < maxSteps; i++) {
          vec3 pos = origin + direction * depth;
          pos.xz *= rotX;
          
          // Simplified deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = applyWaveDeformation(deformed + vec3(0.0, uTime, 0.0), uTime);
          
          // Simplified distance field
          vec2 cosinePair = cos(deformed.xz * 0.8); // Reduced frequency
          float fieldDistance = length(cosinePair) - 0.3; // Larger core
          
          // Radial boundary
          float radialBound = length(pos.xz) - uPillarWidth;
          fieldDistance = max(radialBound, fieldDistance);
          fieldDistance = abs(fieldDistance) * 0.2 + 0.02; // Smoother
          
          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(10.0, -10.0, pos.y));
          color += gradient * pow(1.0 / fieldDistance, 0.8); // Reduced power
          
          if(fieldDistance < EPSILON || depth > maxDepth) break;
          depth += fieldDistance;
        }
        
        // Simplified color processing
        color = tanh(color * uGlowAmount);
        
        // Minimal noise
        if(uNoiseIntensity > 0.0) {
          float rnd = noise(gl_FragCoord.xy * 0.01);
          color -= rnd * uNoiseIntensity * 0.1;
        }
        
        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop with fixed timestep - simplified
    let lastTime = performance.now();
    const targetFPS = 30; // Reduced from 60 for better performance
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeed;
        materialRef.current.uniforms.uTime.value = timeRef.current;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Handle resize with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    webGLSupported
  ]);

  if (!webGLSupported || isLowPerformance) {
    return (
      <div
        className={`w-full h-full absolute top-0 left-0 ${className}`}
        style={{ mixBlendMode }}
      >
        {!webGLSupported ? (
          <div className="w-full h-full flex items-center justify-center bg-black/10 text-gray-500 text-sm">
            WebGL not supported
          </div>
        ) : (
          // CSS fallback for low-performance devices
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full absolute top-0 left-0 ${className}`} 
      style={{ mixBlendMode }} 
    />
  );
};

export default LightPillar;