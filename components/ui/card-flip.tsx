"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardFlipProps = React.ComponentProps<"div"> & {
  children: [React.ReactNode, React.ReactNode];
  toggleOnClick?: boolean;
  autoFlipBackMs?: number;
  onFlipChange?: (flipped: boolean) => void;
};

export function CardFlip({ className, children, toggleOnClick = true, autoFlipBackMs, onFlipChange, ...props }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, back] = React.Children.toArray(children);
  const flipBackTimerRef = useRef<number | null>(null);
  const [isSelectingText, setIsSelectingText] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    if (!toggleOnClick) return;
    // Evitar flip si hay selección activa de texto (subrayado)
    const sel = window.getSelection();
    const isSelectingText = sel && sel.rangeCount > 0 && !sel.isCollapsed && sel.toString().trim().length > 0;
    if (isSelectingText) {
      e.stopPropagation();
      return;
    }
    setIsFlipped((v) => !v);
  };

  // Avisar cambios de flip y auto revertir tras autoFlipBackMs
  useEffect(() => {
    onFlipChange?.(isFlipped);

    // Limpiar timer anterior
    if (flipBackTimerRef.current) {
      window.clearTimeout(flipBackTimerRef.current);
      flipBackTimerRef.current = null;
    }

    // Si está volteado y hay autoFlipBackMs, programar vuelta automática
    if (isFlipped && autoFlipBackMs && autoFlipBackMs > 0 && !isSelectingText) {
      flipBackTimerRef.current = window.setTimeout(() => {
        setIsFlipped(false);
        flipBackTimerRef.current = null;
      }, autoFlipBackMs);
    }

    return () => {
      if (flipBackTimerRef.current) {
        window.clearTimeout(flipBackTimerRef.current);
        flipBackTimerRef.current = null;
      }
    };
  }, [isFlipped, autoFlipBackMs, onFlipChange, isSelectingText]);

  // Detectar selección de texto global para pausar el auto-flip
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      const selecting = !!(sel && sel.rangeCount > 0 && !sel.isCollapsed && sel.toString().trim().length > 0);
      setIsSelectingText(selecting);
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  return (
    <div className={cn("relative w-full", className)} style={{ perspective: "1000px" }} {...props}>
      <motion.div
        className={cn("relative w-full", toggleOnClick && "cursor-pointer")}
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={handleToggle}
      >
        <div className="w-full" style={{ backfaceVisibility: "hidden" }}>
          <div className="relative w-full">{front}</div>
        </div>

        <div
          className="absolute inset-0 w-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(-180deg)" }}
        >
          <div className="relative w-full h-full">{back}</div>
        </div>
      </motion.div>
    </div>
  );
}

export function CardFlipFront({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardFlipBack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardFlipHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        className
      )}
      {...props}
    />
  );
}

export function CardFlipTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

export function CardFlipDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

export function CardFlipAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 justify-self-end", className)} {...props} />
  );
}

export function CardFlipContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

export function CardFlipFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6", className)} {...props} />;
}