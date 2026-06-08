import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RosemarySvg } from '../VideoTemplate';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const text = "Arquivo".split('');

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0e0e0d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background Image */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/darkroom-bg.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />

      {/* Torch/Darkroom expanding light effect */}
      <motion.div
        className="absolute inset-0 bg-[#0e0e0d] z-10"
        animate={{
          clipPath: phase >= 1 ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)'
        }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: 'transparent' }}
      />

      {/* Center SVG tracing */}
      <motion.div className="absolute z-20 text-[oklch(0.66_0.115_55)]">
        {phase >= 1 && (
          <RosemarySvg className="w-[30vh] h-[60vh] opacity-60" animatePath={true} />
        )}
      </motion.div>

      <div className="z-30 flex space-x-[2vw]">
        {text.map((char, i) => (
          <motion.span
            key={i}
            className="font-cormorant text-[12vw] italic font-semibold text-[#f5f0e8]"
            initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
            animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(20px)', y: 20 }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
