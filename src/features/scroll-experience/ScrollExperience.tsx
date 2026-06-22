'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Scene from '@/components/three/Scene';
import TShirtModel from '@/components/three/TShirtModel';
import PantsModel from '@/components/three/PantsModel';
import SneakerModel from '@/components/three/SneakerModel';
import OutfitModel from '@/components/three/OutfitModel';
import StudioLighting from '@/components/three/StudioLighting';
import PostProcessing from '@/components/three/PostProcessing';
import { Environment } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================== */
/*  TYPES & CONSTANTS                                                  */
/* ================================================================== */

interface SceneConfig {
  id: number;
  title: string;
  subtitle: string;
  /** Which model is shown: 'tshirt' | 'pants' | 'sneaker' | 'outfit' */
  activeModel: 'tshirt' | 'pants' | 'sneaker' | 'outfit';
  /** Target Y rotation for the visible model */
  rotationY: number;
  /** Target X rotation */
  rotationX: number;
  /** Background colour for the text overlay */
  bgOverlay: string;
  /** Text alignment */
  align: 'left' | 'right' | 'center';
}

const SCENES: SceneConfig[] = [
  { id: 1,  title: 'THE ESSENTIAL TEE',         subtitle: 'Where luxury meets everyday comfort',           activeModel: 'tshirt',  rotationY: 0,                    rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'left'   },
  { id: 2,  title: 'CRAFTED WITH PRECISION',     subtitle: 'Every stitch tells a story of dedication',     activeModel: 'tshirt',  rotationY: Math.PI * 0.5,        rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'right'  },
  { id: 3,  title: 'EVERY ANGLE MATTERS',        subtitle: 'Designed to impress from every perspective',   activeModel: 'tshirt',  rotationY: Math.PI,              rotationX: 0.1,   bgOverlay: 'rgba(255,255,255,0)',  align: 'left'   },
  { id: 4,  title: 'DETAIL DEFINES LUXURY',      subtitle: 'The unseen craftsmanship that sets us apart',  activeModel: 'tshirt',  rotationY: Math.PI * 1.5,        rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'right'  },
  { id: 5,  title: 'FEEL THE FABRIC',            subtitle: 'Premium cotton that breathes with you',        activeModel: 'tshirt',  rotationY: Math.PI * 2,          rotationX: 0.25,  bgOverlay: 'rgba(255,255,255,0)',  align: 'center' },
  { id: 6,  title: 'BEYOND THE TOP',             subtitle: 'A wardrobe built from the ground up',          activeModel: 'pants',   rotationY: 0,                    rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'left'   },
  { id: 7,  title: 'TAILORED PERFECTION',        subtitle: 'Precision‑cut for the modern silhouette',      activeModel: 'pants',   rotationY: Math.PI,              rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'right'  },
  { id: 8,  title: 'STEP INTO STYLE',            subtitle: 'Where form meets function, step by step',      activeModel: 'sneaker', rotationY: -Math.PI * 0.25,      rotationX: -0.3,  bgOverlay: 'rgba(255,255,255,0)',  align: 'left'   },
  { id: 9,  title: 'THE COMPLETE LOOK',          subtitle: 'Head‑to‑toe luxury, effortlessly composed',    activeModel: 'outfit',  rotationY: Math.PI * 0.15,       rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'center' },
  { id: 10, title: 'EXPLORE THE COLLECTION',     subtitle: 'Your journey into refined style begins now',   activeModel: 'outfit',  rotationY: Math.PI * 0.5,        rotationX: 0,     bgOverlay: 'rgba(255,255,255,0)',  align: 'center' },
];

const TOTAL_SCENES = SCENES.length;

/* ================================================================== */
/*  HELPER: smooth step for cross‑fade between scenes                  */
/* ================================================================== */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ================================================================== */
/*  INNER 3D SCENE (runs inside R3F Canvas)                            */
/* ================================================================== */
interface SceneContentProps {
  progress: number;
  mouseX: number;
  mouseY: number;
}

function SceneContent({ progress, mouseX, mouseY }: SceneContentProps) {
  /* Determine which scene we're in */
  const sceneIndex = Math.min(TOTAL_SCENES - 1, Math.floor(progress * TOTAL_SCENES));
  const sceneLocal = (progress * TOTAL_SCENES) - sceneIndex; // 0‑1 within current scene
  const scene = SCENES[sceneIndex];

  /* ---- Model visibility & opacity ---- */
  const tshirtVisible = scene.activeModel === 'tshirt';
  const pantsVisible = scene.activeModel === 'pants';
  const sneakerVisible = scene.activeModel === 'sneaker';
  const outfitVisible = scene.activeModel === 'outfit';

  /* Cross‑fade: fade out at end of scene, fade in at start */
  const fadeIn = smoothstep(0, 0.15, sceneLocal);
  const fadeOut = 1 - smoothstep(0.85, 1, sceneLocal);
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  /* ---- Per‑model rotation with smooth interpolation ---- */
  const currentRot = useRef({ y: 0, x: 0 });
  const targetRotY = scene.rotationY + mouseX * 0.1;
  const targetRotX = scene.rotationX + mouseY * 0.06;

  useFrame((_state, delta) => {
    const speed = 1 - Math.pow(0.0001, delta);
    currentRot.current.y += (targetRotY - currentRot.current.y) * speed;
    currentRot.current.x += (targetRotX - currentRot.current.x) * speed;
  });

  /* ---- Scale pulse for emphasis in scene 5 (texture zoom) ---- */
  const tshirtScale = sceneIndex === 4 ? 1.6 + sceneLocal * 0.4 : 1.4;
  const pantsScale = 1.2;
  const sneakerScale = 1.8;

  return (
    <>
      {/* Dynamic lighting reacting to scene */}
      <StudioLighting scene={scene.id} intensity={1.1} />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* T-Shirt (scenes 1‑5) */}
      <TShirtModel
        scrollProgress={progress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={tshirtVisible}
        opacity={tshirtVisible ? sceneOpacity : 0}
        rotationY={currentRot.current.y}
        rotationX={currentRot.current.x}
        scale={tshirtScale}
        color="#F5F0EB"
      />

      {/* Pants (scenes 6‑7) */}
      <PantsModel
        scrollProgress={progress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={pantsVisible}
        opacity={pantsVisible ? sceneOpacity : 0}
        rotationY={currentRot.current.y}
        rotationX={currentRot.current.x}
        scale={pantsScale}
        color="#2C2C2C"
      />

      {/* Sneaker (scene 8) */}
      <SneakerModel
        scrollProgress={progress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={sneakerVisible}
        opacity={sneakerVisible ? sceneOpacity : 0}
        rotationY={currentRot.current.y}
        rotationX={currentRot.current.x}
        scale={sneakerScale}
        color="#F5F0EB"
        accentColor="#C9A96E"
      />

      {/* Full Outfit (scenes 9‑10) */}
      <OutfitModel
        scrollProgress={progress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={outfitVisible}
        opacity={outfitVisible ? sceneOpacity : 0}
        rotationY={currentRot.current.y}
        scale={0.65}
        revealAnimation={sceneIndex === 8}
      />

      {/* Post-processing */}
      <PostProcessing
        bloomIntensity={0.35}
        vignetteIntensity={0.3}
        noiseIntensity={0.04}
      />
    </>
  );
}

/* ================================================================== */
/*  PROGRESS INDICATOR (side dots)                                     */
/* ================================================================== */
function ProgressIndicator({ progress }: { progress: number }) {
  const activeIndex = Math.min(TOTAL_SCENES - 1, Math.floor(progress * TOTAL_SCENES));

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        zIndex: 50,
      }}
    >
      {SCENES.map((s, i) => (
        <div
          key={s.id}
          style={{
            width: i === activeIndex ? 10 : 6,
            height: i === activeIndex ? 10 : 6,
            borderRadius: '50%',
            background: i === activeIndex ? '#C9A96E' : 'rgba(201,169,110,0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          title={s.title}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  TEXT OVERLAY per scene                                              */
/* ================================================================== */
interface TextOverlayProps {
  scene: SceneConfig;
  isActive: boolean;
  isLast: boolean;
}

const textVariants = {
  hidden: (align: string) => ({
    opacity: 0,
    x: align === 'left' ? -60 : align === 'right' ? 60 : 0,
    y: align === 'center' ? 40 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
  exit: (align: string) => ({
    opacity: 0,
    x: align === 'left' ? -40 : align === 'right' ? 40 : 0,
    y: align === 'center' ? -30 : 0,
    transition: { duration: 0.5, ease: 'easeIn' as any },
  }),
};

function TextOverlay({ scene, isActive, isLast }: TextOverlayProps) {
  /* Alignment → position styles */
  const positionStyles = useMemo(() => {
    switch (scene.align) {
      case 'left':
        return { left: '8%', right: 'auto', textAlign: 'left' as const };
      case 'right':
        return { left: 'auto', right: '8%', textAlign: 'right' as const };
      case 'center':
      default:
        return { left: '50%', right: 'auto', textAlign: 'center' as const, transform: 'translateX(-50%)' };
    }
  }, [scene.align]);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={scene.id}
          custom={scene.align}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: '50%',
            marginTop: -60,
            zIndex: 30,
            pointerEvents: isLast ? 'auto' : 'none',
            maxWidth: 520,
            ...positionStyles,
          }}
        >
          {/* Gold accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              height: 2,
              background: '#C9A96E',
              marginBottom: 20,
              marginLeft: scene.align === 'right' ? 'auto' : scene.align === 'center' ? 'auto' : 0,
              marginRight: scene.align === 'center' ? 'auto' : 0,
            }}
          />

          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              lineHeight: 1.1,
              margin: 0,
              color: '#1A1A1A',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {scene.title}
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.6,
              color: 'rgba(0,0,0,0.5)',
              marginTop: 16,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {scene.subtitle}
          </p>

          {/* CTA button on last scene */}
          {isLast && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                marginTop: 32,
                padding: '14px 40px',
                border: '1px solid #C9A96E',
                background: 'transparent',
                color: '#C9A96E',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'system-ui, sans-serif',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E';
                (e.currentTarget as HTMLButtonElement).style.color = '#FFF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#C9A96E';
              }}
            >
              Shop Collection
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  SCROLL EXPERIENCE – master component                               */
/* ================================================================== */
export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const progressRef = useRef(0);

  /* ---- GSAP ScrollTrigger setup ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ---- Mouse tracking (normalised -1…1) ---- */
  const handlePointerMove = useCallback((x: number, y: number) => {
    setMousePos({ x, y });
  }, []);

  /* ---- Derived scene info ---- */
  const activeSceneIndex = Math.min(TOTAL_SCENES - 1, Math.floor(progress * TOTAL_SCENES));
  const activeScene = SCENES[activeSceneIndex];

  /* ---- Dynamic background colour based on scene ---- */
  const bgColor = useMemo(() => {
    // Subtle warm gradient shift per scene
    const palette = [
      '#FAFAF8', // 1
      '#FAF8F5', // 2
      '#F8F5F0', // 3
      '#F7F3ED', // 4
      '#F5F0EB', // 5
      '#F3EDE6', // 6
      '#F5F0EB', // 7
      '#F7F3ED', // 8
      '#F8F5F0', // 9
      '#FAFAF8', // 10
    ];
    return palette[activeSceneIndex] || '#FAFAF8';
  }, [activeSceneIndex]);

  return (
    <>
      {/* Scrollable container – 10 screen heights */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: `${TOTAL_SCENES * 100}vh`,
          background: bgColor,
          transition: 'background 0.8s ease',
        }}
      >
        {/* Pinned 3D canvas – stays fixed while scrolling through container */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 10,
          }}
        >
          <Scene
            cameraPosition={[0, 0, 5]}
            shadows
            onPointerMove={handlePointerMove}
            style={{ width: '100%', height: '100%' }}
          >
            <SceneContent
              progress={progress}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
            />
          </Scene>
        </div>

        {/* Scene section markers (for GSAP ScrollTrigger mapping) */}
        {SCENES.map((s) => (
          <div
            key={s.id}
            id={`scene-${s.id}`}
            style={{ height: '100vh', position: 'relative' }}
            aria-hidden
          />
        ))}
      </div>

      {/* Text overlays – rendered outside the scrollable container, fixed position */}
      {SCENES.map((s, i) => (
        <TextOverlay
          key={s.id}
          scene={s}
          isActive={activeSceneIndex === i}
          isLast={i === TOTAL_SCENES - 1}
        />
      ))}

      {/* Side progress dots */}
      <ProgressIndicator progress={progress} />

      {/* Scene counter – bottom left */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 50,
          fontSize: 12,
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: 'rgba(0,0,0,0.3)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {String(activeScene.id).padStart(2, '0')} / {TOTAL_SCENES}
      </div>
    </>
  );
}
