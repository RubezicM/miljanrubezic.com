"use client";
import { motion } from "framer-motion";
import { Avatar } from "@readyplayerme/visage";
import { useEffect, useState, useCallback } from "react";

const animations = {
  standing_idle: {
    source: "/assets/avatar/animations/brief2.fbx",
    fadeTime: 0.5,
  },
  hovered: {
    source: "/assets/avatar/animations/breathing2.fbx",
    fadeTime: 0.5,
  },
};

const AvatarPhoto = ({
  onModelLoaded,
  externalHover = false, // new prop
}: {
  onModelLoaded?: () => void;
  externalHover?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("standing_idle");
  const [loaded, setLoaded] = useState(false);

  const hovered = isHovered || externalHover;

  useEffect(() => {
    setCurrentAnimation(hovered ? "hovered" : "standing_idle");
  }, [hovered]);

  const handleModelLoaded = useCallback(() => {
    onModelLoaded?.();
    setTimeout(() => {
      setLoaded(true);
    }, 650);
  }, [onModelLoaded]);

  return (
    <div
      className="h-full w-full relative flex items-center justify-center cursor-pointer glow-ring"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-[264px] w-[264px] xl:w-[430px] xl:h-[430px] absolute ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      >
        <Avatar
          modelSrc="/assets/avatar/avatar.glb"
          cameraInitialDistance={0.85}
          onLoaded={() => handleModelLoaded()}
          shadows={false}
          idleRotation={false}
          cameraTarget={2.35}
          fillLightColor={hovered ? "rgba(1,153,203,7)" : "#fff"}
          fillLightIntensity={4.9}
          backLightColor={hovered ? "rgba(1,153,203,45)" : "#fff"}
          backLightIntensity={1.67}
          keyLightColor={"#fff"}
          keyLightIntensity={0.67}
          scale={1.4}
          headMovement={true}
          animations={animations}
          activeAnimation={currentAnimation}
          emotion={{
            browInnerUp: 0.5,
            browOuterUpLeft: 0.37,
            browOuterUpRight: 0.49,
            eyeSquintLeft: 0.65,
            eyeSquintRight: 0.65,
            mouthShrugUpper: 0.47,
            mouthSmileLeft: 0.67,
            mouthSmileRight: 0.656,
            jawOpen: 0.125,
          }}
          style={{
            zIndex: 9999999999,
            position: "absolute",
            left: "-10px",
            top: 0,
            pointerEvents: "none",
          }}
          className="rounded-full"
        />
      </div>

      {/* Circle */}
      <motion.svg
        className="w-[266px] xl:w-[445px] xl:h-[445px] h-[280px] relative rounded-full"
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="253"
          cy="253"
          r="250"
          stroke="#0199cb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0", rotate: 0 }}
          animate={{
            strokeDasharray: ["15,120,25,25", "16 25 92 72", "4 250 22 22"],
            rotate: hovered ? [0, 360] : [120, 480],
          }}
          transition={{
            duration: hovered ? 6 : 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            filter:
              "drop-shadow(0 0 6px #0199cb) drop-shadow(0 0 12px #0199cb)",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AvatarPhoto;
