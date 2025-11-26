"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { cn } from "../../lib/utils";
import { ComponentProps } from "react";

type LibrarySpeedType = ComponentProps<typeof TypeAnimation>["speed"];

type SpeedType = number | "slow" | "normal" | "fast";

interface TypeanimationProps {
  words?: string[];
  className?: string;
  typingSpeed?: SpeedType;
  deletingSpeed?: SpeedType;
  pauseDuration?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

// Mapeo de colores a clases de Tailwind
const gradientMap: Record<string, string> = {
  "blue-500": "from-blue-500",
  "blue-600": "from-blue-600",
  "purple-500": "from-purple-500",
  "purple-600": "from-purple-600",
  "teal-500": "from-teal-500",
  "teal-600": "from-teal-600",
  "red-500": "from-red-500",
  "yellow-500": "from-yellow-500",
};

const gradientToMap: Record<string, string> = {
  "blue-500": "to-blue-500",
  "blue-600": "to-blue-600",
  "purple-500": "to-purple-500",
  "purple-600": "to-purple-600",
  "teal-500": "to-teal-500",
  "teal-600": "to-teal-600",
  "red-500": "to-red-500",
  "yellow-500": "to-yellow-500",
};

// Mapeo de colores a valores hex para el cursor
const colorMap: Record<string, string> = {
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "red-500": "#ef4444",
  "yellow-500": "#eab308",
};

const Typeanimation = ({
  words = [" existence", " reality", " the Internet"],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
  gradientFrom = "blue-500",
  gradientTo = "purple-600",
}: TypeanimationProps) => {
  const sequence = words.flatMap((word) => [word, pauseDuration]);
  
  const fromClass = gradientMap[gradientFrom] || "from-blue-500";
  const toClass = gradientToMap[gradientTo] || "to-purple-600";
  const isSolidColor = gradientFrom === gradientTo;
  const cursorColor = colorMap[gradientFrom] || colorMap[gradientTo] || "#3b82f6";

  return (
    <motion.span
      className={cn(
        isSolidColor ? "" : "bg-clip-text text-transparent bg-gradient-to-r",
        !isSolidColor && fromClass,
        !isSolidColor && toClass,
        className,
        "inline-flex items-center"
      )}
      style={isSolidColor ? { color: cursorColor } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        repeat={Infinity}
        className="inline-block"
        speed={typingSpeed as LibrarySpeedType}
        deletionSpeed={deletingSpeed as LibrarySpeedType}
        cursor={false}
      />
      <span 
        className="inline-block animate-blink ml-1"
        style={{
          backgroundColor: cursorColor,
          width: '2px',
          height: '1em',
          flexShrink: 0
        }}
      />
    </motion.span>
  );
};

export default Typeanimation;