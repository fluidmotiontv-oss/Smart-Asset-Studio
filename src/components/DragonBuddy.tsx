import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Shield, Zap, Sparkles } from 'lucide-react';

export const DragonBuddy: React.FC = () => {
  const [isCrawlActive, setIsCrawlActive] = useState(true);
  const [plasmaBurst, setPlasmaBurst] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 60, damping: 20 };
  const dragonX = useSpring(mouseX, springConfig);
  const dragonY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 40);
      mouseY.set(e.clientY - 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerPlasma = () => {
    setPlasmaBurst(true);
    setTimeout(() => setPlasmaBurst(false), 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <motion.div
        style={{ x: dragonX, y: dragonY }}
        className="absolute w-20 h-20 flex items-center justify-center cursor-none"
      >
        {/* Plasma Burst Effect */}
        {plasmaBurst && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 blur-xl"
          />
        )}

        {/* Dragon Body */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          onClick={(e) => {
             // In a real app, pointer-events-none would prevent this, but we can toggle it
          }}
          className="relative w-12 h-12 bg-zinc-900 border-2 border-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/20 pointer-events-auto cursor-pointer group"
          onMouseEnter={triggerPlasma}
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <Shield className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
          
          {/* Dragon Wings */}
          <div className="absolute -left-4 w-6 h-3 bg-orange-950 border border-orange-600/50 rounded-full -rotate-12 blur-[1px]" />
          <div className="absolute -right-4 w-6 h-3 bg-orange-950 border border-orange-600/50 rounded-full rotate-12 blur-[1px]" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full mb-3 hidden group-hover:block bg-[#0a0a0b] border border-zinc-800 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl">
             <p className="text-[10px] font-mono font-bold text-orange-500">Dragon 9 Sentry</p>
             <p className="text-[9px] text-zinc-400">Monitoring sovereign node health...</p>
          </div>
        </motion.div>

        {/* Tail Trail */}
        <div className="absolute -z-10 w-2 h-12 bg-gradient-to-t from-transparent to-orange-900/40 blur-sm rounded-full -translate-y-4" />
      </motion.div>
    </div>
  );
};
