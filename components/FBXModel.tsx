'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

interface AnimatedModelProps {
  url: string;
  scrollProgress?: number;
}

function AnimatedModel({ url, scrollProgress = 0 }: AnimatedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      url,
      (fbx) => {
        // 모델 스케일 더 크게 조정
        fbx.scale.set(0.018, 0.018, 0.018);
        fbx.position.y = -1.2;

        // 애니메이션이 있으면 믹서 생성
        if (fbx.animations && fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          mixerRef.current = mixer;

          // 첫 번째 애니메이션 재생
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
        }

        setModel(fbx);
      },
      (progress) => {
        console.log((progress.loaded / progress.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading FBX:', error);
      }
    );

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [url]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      // 스크롤 진행도에 따라 애니메이션 속도 조절 (0.5 ~ 2배로 더 크게)
      const timeScale = 0.5 + scrollProgress * 1.5;
      mixerRef.current.timeScale = timeScale;
      mixerRef.current.update(delta);
    }

    // 스크롤에 따라 회전 - 더 다이나믹하게
    if (groupRef.current) {
      const rotationSpeed = 0.005 + (scrollProgress * 0.015);
      groupRef.current.rotation.y += rotationSpeed;

      // 스크롤에 따라 살짝 상하 움직임 추가
      groupRef.current.position.y = -1.2 + Math.sin(scrollProgress * Math.PI * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {model && <primitive object={model} />}
    </group>
  );
}

interface FBXModelProps {
  className?: string;
  scrollProgress?: number;
}

export default function FBXModel({ className = '', scrollProgress = 0 }: FBXModelProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        {/* 카메라를 더 가까이 배치 */}
        <PerspectiveCamera makeDefault position={[0.5, 0.8, 2.2]} fov={50} />

        {/* 조명 - 보라색/시안 톤 */}
        <ambientLight intensity={0.6} color="#c8b9ff" />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#8a63ff" />
        <spotLight position={[0, 10, 0]} intensity={0.7} color="#7ecbff" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#47c4ff" />

        {/* 3D 모델 */}
        <AnimatedModel url="/3dmodel/standup.fbx" scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
