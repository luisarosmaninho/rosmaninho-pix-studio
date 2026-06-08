import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 4000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const words = ["urbanas", "natureza", "retratos", "iguarias"];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/coimbra-bg.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-15"
        initial={{ x: '5%' }}
        animate={{ x: '-5%' }}
        transition={{ duration: 6, ease: 'linear' }}
      />

      <div className="z-30 w-full px-[10vw] flex flex-col items-center">
        <div className="flex flex-row flex-wrap justify-center items-center gap-[2vw] text-center w-full">
          {words.map((word, i) => (
            <div key={word} className="flex items-center gap-[2vw]">
              <motion.span
                className="font-cormorant italic text-[5vw] text-[#f5f0e8]"
                initial={{ opacity: 0, filter: 'blur(15px)', y: 20 }}
                animate={phase >= i + 1 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(15px)', y: 20 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && (
                <motion.span
                  className="text-[oklch(0.66_0.115_55)] text-[2vw]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={phase >= i + 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, ease: 'backOut' }}
                >
                  ·
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* Copper horizontal rule */}
        <motion.div
          className="h-[1px] bg-[oklch(0.66_0.115_55)] mt-[5vh]"
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 4 ? { width: '80%', opacity: 0.5 } : { width: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}
