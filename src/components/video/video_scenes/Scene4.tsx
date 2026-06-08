import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#0e0e0d]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="z-30 text-center flex flex-col items-center">
        <motion.h2 
          className="font-cormorant text-[25vw] italic font-semibold text-[#f5f0e8] leading-[0.8]"
          initial={{ opacity: 0, filter: 'blur(40px)', scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0, filter: 'blur(40px)', scale: 0.9 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          Lento.
        </motion.h2>
        
        <motion.p
          className="font-cormorant italic text-[3vw] text-[oklch(0.66_0.115_55)] mt-[4vh]"
          initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
          animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(20px)', y: 20 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          fotografias que ficam.
        </motion.p>
      </div>
    </motion.div>
  );
}
