'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 4000;

export default function MorphingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Generate targets
  const { tshirtPos, pantsPos, sneakerPos, outfitPos } = useMemo(() => {
    const tPos = new Float32Array(PARTICLE_COUNT * 3);
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    const sPos = new Float32Array(PARTICLE_COUNT * 3);
    const oPos = new Float32Array(PARTICLE_COUNT * 3);

    // Helper randoms
    const randomInCylinder = (radius: number, height: number, centerY: number, centerX: number = 0) => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      return {
        x: centerX + Math.cos(angle) * r,
        y: centerY + (Math.random() - 0.5) * height,
        z: Math.sin(angle) * r,
      };
    };

    // Helper for box-like sneaker coordinates
    const randomInBox = (w: number, h: number, d: number, cx: number, cy: number, cz: number) => {
      return {
        x: cx + (Math.random() - 0.5) * w,
        y: cy + (Math.random() - 0.5) * h,
        z: cz + (Math.random() - 0.5) * d,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // 1. T-shirt Coordinates
      let tsPoint = { x: 0, y: 0, z: 0 };
      const tsRand = Math.random();
      if (tsRand < 0.7) {
        // Torso
        tsPoint = randomInCylinder(0.65, 1.3, 0);
      } else if (tsRand < 0.85) {
        // Left sleeve
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.25;
        // Extend sleeve outwards left and slightly down
        const length = Math.random() * 0.55;
        tsPoint = {
          x: -0.65 - length * 0.8,
          y: 0.35 - length * 0.4 + Math.cos(angle) * r,
          z: Math.sin(angle) * r,
        };
      } else {
        // Right sleeve
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.25;
        const length = Math.random() * 0.55;
        tsPoint = {
          x: 0.65 + length * 0.8,
          y: 0.35 - length * 0.4 + Math.cos(angle) * r,
          z: Math.sin(angle) * r,
        };
      }
      tPos[i3] = tsPoint.x;
      tPos[i3 + 1] = tsPoint.y;
      tPos[i3 + 2] = tsPoint.z;

      // 2. Pants Coordinates
      let pPoint = { x: 0, y: 0, z: 0 };
      const pRand = Math.random();
      if (pRand < 0.2) {
        // Waist/Hips
        pPoint = randomInCylinder(0.5, 0.4, 0.4);
      } else if (pRand < 0.6) {
        // Left Leg
        pPoint = randomInCylinder(0.2, 1.2, -0.4, -0.23);
      } else {
        // Right Leg
        pPoint = randomInCylinder(0.2, 1.2, -0.4, 0.23);
      }
      pPos[i3] = pPoint.x;
      pPos[i3 + 1] = pPoint.y;
      pPos[i3 + 2] = pPoint.z;

      // 3. Sneaker Coordinates
      let sPoint = { x: 0, y: 0, z: 0 };
      const sRand = Math.random();
      if (sRand < 0.5) {
        // Left sneaker: Sole + Body
        const shoeRand = Math.random();
        if (shoeRand < 0.6) {
          // Foot sole/bed length along Z
          sPoint = randomInBox(0.3, 0.2, 0.8, -0.45, -0.85, 0.1);
        } else {
          // Ankle collar
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.15;
          sPoint = {
            x: -0.45 + Math.cos(angle) * r,
            y: -0.65 + Math.random() * 0.3,
            z: -0.15 + Math.sin(angle) * r,
          };
        }
      } else {
        // Right sneaker
        const shoeRand = Math.random();
        if (shoeRand < 0.6) {
          sPoint = randomInBox(0.3, 0.2, 0.8, 0.45, -0.85, 0.1);
        } else {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.15;
          sPoint = {
            x: 0.45 + Math.cos(angle) * r,
            y: -0.65 + Math.random() * 0.3,
            z: -0.15 + Math.sin(angle) * r,
          };
        }
      }
      sPos[i3] = sPoint.x * 1.2;
      sPos[i3 + 1] = sPoint.y * 1.2 + 0.3; // Center vertically slightly
      sPos[i3 + 2] = sPoint.z * 1.2;

      // 4. Full Outfit Coordinates (Stacked T-shirt + Pants + Sneakers scaled)
      let oPoint = { x: 0, y: 0, z: 0 };
      const oRand = Math.random();
      if (oRand < 0.4) {
        // Shirt (upper part)
        // Scale down slightly and move up
        const tsScaleX = tsPoint.x * 0.8;
        const tsScaleY = tsPoint.y * 0.8 + 0.5;
        const tsScaleZ = tsPoint.z * 0.8;
        oPoint = { x: tsScaleX, y: tsScaleY, z: tsScaleZ };
      } else if (oRand < 0.8) {
        // Pants (middle part)
        const pScaleX = pPoint.x * 0.75;
        const pScaleY = pPoint.y * 0.75 - 0.2;
        const pScaleZ = pPoint.z * 0.75;
        oPoint = { x: pScaleX, y: pScaleY, z: pScaleZ };
      } else {
        // Sneakers (bottom part)
        const sScaleX = sPoint.x * 0.7;
        const sScaleY = sPoint.y * 0.7 - 0.35;
        const sScaleZ = sPoint.z * 0.7;
        oPoint = { x: sScaleX, y: sScaleY, z: sScaleZ };
      }
      oPos[i3] = oPoint.x;
      oPos[i3 + 1] = oPoint.y;
      oPos[i3 + 2] = oPoint.z;
    }

    return {
      tshirtPos: tPos,
      pantsPos: pPos,
      sneakerPos: sPos,
      outfitPos: oPos
    };
  }, []);

  // Set up initial positions as tshirt
  const initialPos = useMemo(() => new Float32Array(tshirtPos), [tshirtPos]);

  // Object tracking values to tween between shapes
  const morphState = useMemo(() => ({
    progress: 0,       // overall scroll progress (0 to 1)
    morphTshirtToPants: 0, // 0 to 1
    morphPantsToSneaker: 0, // 0 to 1
    morphSneakerToOutfit: 0, // 0 to 1
    mouseEffect: 0,
    pointSize: 3.5,
  }), []);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map to normalized coordinates -1 to 1
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Bind GSAP ScrollTrigger timeline to progress values if element is ready in DOM
    const triggerEl = document.getElementById('showroom-trigger-container');
    if (!triggerEl) {
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // markers: false,
      }
    });

    // We have 10 scenes, map timeline across scroll trigger
    tl.to(morphState, { progress: 1, ease: 'none' })
      .to(morphState, { morphTshirtToPants: 1, ease: 'power2.inOut' }, 0.4)
      .to(morphState, { morphPantsToSneaker: 1, ease: 'power2.inOut' }, 0.65)
      .to(morphState, { morphSneakerToOutfit: 1, ease: 'power2.inOut' }, 0.82);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [morphState]);

  // Shader definition for nice luxury glowing points
  const vertexShader = `
    uniform float uTime;
    uniform float uProgress;
    uniform float uMouseX;
    uniform float uMouseY;
    uniform float uPointSize;
    attribute vec3 aPants;
    attribute vec3 aSneaker;
    attribute vec3 aOutfit;
    
    // Morph factors
    uniform float uMorphTP; // Tshirt to Pants
    uniform float uMorphPS; // Pants to Sneaker
    uniform float uMorphSO; // Sneaker to Outfit

    varying vec3 vPosition;
    varying float vDistance;

    void main() {
      // Step 1: Interpolate positions
      vec3 currentPos = position;
      
      // Morph Tshirt -> Pants
      currentPos = mix(currentPos, aPants, uMorphTP);
      
      // Morph Pants -> Sneaker
      currentPos = mix(currentPos, aSneaker, uMorphPS);
      
      // Morph Sneaker -> Outfit
      currentPos = mix(currentPos, aOutfit, uMorphSO);

      // Step 2: Mouse interaction (magnetic displacement)
      vec3 targetMouse = vec3(uMouseX * 1.5, uMouseY * 1.5, 0.0);
      float distToMouse = distance(currentPos, targetMouse);
      if (distToMouse < 1.2) {
        float force = (1.2 - distToMouse) / 1.2;
        currentPos += normalize(currentPos - targetMouse) * force * 0.18;
      }

      // Step 3: Floating / Wind noise based on uTime
      currentPos.x += sin(currentPos.y * 3.0 + uTime * 0.8) * 0.02;
      currentPos.y += cos(currentPos.x * 2.0 + uTime * 0.6) * 0.02;

      // Project vertex
      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Size attenuation
      gl_PointSize = uPointSize * (3.0 / -mvPosition.z);

      vPosition = currentPos;
      vDistance = distToMouse;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uProgress;
    varying vec3 vPosition;
    varying float vDistance;

    void main() {
      // Shape points as circle, not square
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;

      // Dark charcoal and deep luxury gold for light theme contrast
      vec3 colCharcoal = vec3(0.12, 0.12, 0.14);
      vec3 colGold = vec3(0.68, 0.51, 0.26); // #C9A96E dark

      vec3 finalColor = mix(colCharcoal, colGold, uProgress);

      // Light gold glow when mouse is close
      if (vDistance < 1.2) {
        float glow = (1.2 - vDistance) / 1.2;
        finalColor = mix(finalColor, vec3(0.79, 0.66, 0.43), glow * 0.4);
      }

      // Soft edges
      float alpha = smoothstep(0.5, 0.2, dist) * 0.9;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Custom uniforms memo
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uMorphTP: { value: 0 },
    uMorphPS: { value: 0 },
    uMorphSO: { value: 0 },
    uMouseX: { value: 0 },
    uMouseY: { value: 0 },
    uPointSize: { value: 3.5 },
  }), []);

  // Update loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Lerp mouse
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    // Update uniforms
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time;
      shaderRef.current.uniforms.uProgress.value = morphState.progress;
      shaderRef.current.uniforms.uMorphTP.value = morphState.morphTshirtToPants;
      shaderRef.current.uniforms.uMorphPS.value = morphState.morphPantsToSneaker;
      shaderRef.current.uniforms.uMorphSO.value = morphState.morphSneakerToOutfit;
      shaderRef.current.uniforms.uMouseX.value = mouse.current.x;
      shaderRef.current.uniforms.uMouseY.value = mouse.current.y;
      shaderRef.current.uniforms.uPointSize.value = morphState.pointSize;
    }

    // Scroll-linked rotation of the points
    if (pointsRef.current) {
      // Scene-based camera rotation and zoom via rotation of points
      const p = morphState.progress;
      
      // Let's create an elegant rotation path
      // T-shirt rotates slowly at first, then side, then back, then rotates fully
      pointsRef.current.rotation.y = time * 0.15 + p * Math.PI * 4;

      // Tilt slightly based on mouse
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1 + mouse.current.y * 0.15;
      pointsRef.current.rotation.z = mouse.current.x * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPos, 3]}
        />
        <bufferAttribute
          attach="attributes-aPants"
          args={[pantsPos, 3]}
        />
        <bufferAttribute
          attach="attributes-aSneaker"
          args={[sneakerPos, 3]}
        />
        <bufferAttribute
          attach="attributes-aOutfit"
          args={[outfitPos, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
