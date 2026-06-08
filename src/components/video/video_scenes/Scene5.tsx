import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RosemarySvg } from '../VideoTemplate';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#0e0e0d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="z-30 flex flex-col items-center">
        <motion.div 
          className="text-[oklch(0.66_0.115_55)] mb-[4vh]"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <RosemarySvg className="w-[15vw] h-[30vh]" animatePath={true} />
        </motion.div>

        <motion.div
          className="font-cinzel text-[1.5vw] tracking-[0.2em] text-[#f5f0e8] text-center flex flex-col gap-[1vh]"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Luísa Rosmaninho</span>
          <span className="text-[1vw] text-[#2a2520] tracking-widest mt-2">
            COIMBRA · PORTUGAL
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
