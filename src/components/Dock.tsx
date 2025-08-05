// src/components/Dock.tsx
"use client";

import React, { Children, cloneElement, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
} from "framer-motion";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

interface DockItemProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
}

export interface DockLabelProps {
  className?: string;
  children: React.ReactNode;
  isHovered: MotionValue<number>;
}

function DockLabel({ children, className = "", isHovered }: DockLabelProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unsub = isHovered.on("change", (v) => setVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white`}
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface DockIconProps {
  className?: string;
  children: React.ReactNode;
}

function DockIcon({ children, className = "" }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const height = useSpring(panelHeight, spring);

  return (
    <motion.div
      onMouseMove={({ pageX }) => {
        isHovered.set(1);
        mouseX.set(pageX);
      }}
      onMouseLeave={() => {
        isHovered.set(0);
        mouseX.set(Infinity);
      }}
      style={{ height }}
      className={`${className} flex items-end w-fit gap-4 rounded-2xl border-2 border-neutral-700 bg-[#D3DBF1]/80 backdrop-blur-md pb-2 px-4`}
      role="toolbar"
      aria-label="Application dock"
    >
      {items.map((item, i) => (
        <DockItem
          key={i}
          onClick={item.onClick}
          className={item.className}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
        >
          <DockIcon>{item.icon}</DockIcon>
          <DockLabel isHovered={isHovered}>{item.label}</DockLabel>
        </DockItem>
      ))}
    </motion.div>
  );
}

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hoverVal = useMotionValue(0);
  const mouseDist = useTransform(mouseX, (v) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return v - rect.x - baseItemSize / 2;
  });
  const targetSize = useTransform(
    mouseDist,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => hoverVal.set(1)}
      onHoverEnd={() => hoverVal.set(0)}
      onFocus={() => hoverVal.set(1)}
      onBlur={() => hoverVal.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full border border-neutral-700 bg-white/5 hover:bg-white/10 transition-colors duration-200 shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Seul DockLabel reçoit isHovered
        if (child.type === DockLabel) {
          return cloneElement(child as React.ReactElement<DockLabelProps>, { isHovered: hoverVal });
        }
        return child;
      })}
    </motion.div>
  );
}
