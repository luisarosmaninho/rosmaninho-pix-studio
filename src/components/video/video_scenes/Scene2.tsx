import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/darkroom-bg.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 4.5, ease: 'linear' }}
      />

      <div className="z-30 text-center flex flex-col items-center">
        <motion.h1 
          className="font-cormorant text-[14vw] italic font-semibold text-[oklch(0.66_0.115_55)] leading-none"
          initial={{ opacity: 0, filter: 'blur(30px)', y: 40 }}
          animate={phase >= 1 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(30px)', y: 40 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Rosmaninho
        </motion.h1>
        
        <motion.div
          className="font-cinzel text-[2vw] tracking-[0.4em] text-[#f5f0e8] mt-[2vh]"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          FOTOGRAFIA
        </motion.div>
      </div>

      {/* Coordinates in corners */}
      <motion.div 
        className="absolute bottom-[4vh] left-[4vw] font-cinzel text-[1vw] text-[#2a2520] tracking-widest"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        40°12'N · 8°25'O
      </motion.div>
      <motion.div 
        className="absolute bottom-[4vh] right-[4vw] font-cinzel text-[1vw] text-[#2a2520] tracking-widest"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        COIMBRA
      </motion.div>

    </motion.div>
  );
}
