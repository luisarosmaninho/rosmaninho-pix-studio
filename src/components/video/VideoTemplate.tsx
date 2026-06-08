import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video/hooks';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = {
  abertura: 4000,
  oNome: 4500,
  asSeries: 5000,
  oArquivo: 4000,
  fecho: 4000,
};

// Global SVG definition for the rosemary sprig
export const RosemarySvg = ({ className = '', animatePath = false, pathLength = 1 }) => (
  <svg viewBox="0 0 100 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M50 180 Q45 100 55 20 M50 150 Q70 140 80 120 M52 140 Q30 130 20 110 M52 110 Q75 100 85 80 M53 90 Q30 80 20 60 M54 60 Q70 50 80 30 M54 40 Q35 30 30 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={animatePath ? { pathLength: 0 } : { pathLength: pathLength }}
      animate={{ pathLength }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#0e0e0d' }}>
      {/* Global fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600;1,700&family=Cinzel:wght@400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
      `}</style>

      {/* Persistent background layers */}
      
      {/* Base film grain overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Amber Safelight Tint */}
      <div className="absolute inset-0 pointer-events-none bg-[rgba(58,24,0,0.4)] z-40 mix-blend-multiply" />

      {/* Persistent Drifting Amber Light Blob */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-40 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, oklch(0.66 0.115 55), transparent 70%)' }}
        animate={{
          x: ['-20vw', '40vw', '10vw', '-20vw'],
          y: ['-20vh', '10vh', '50vh', '-20vh'],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Persistent Rosemary Sprig in Midground */}
      <motion.div
        className="absolute pointer-events-none z-10 text-[oklch(0.66_0.115_55)]"
        animate={{
          x: currentScene === 0 ? '45vw' : currentScene === 4 ? '50vw' : '85vw',
          y: currentScene === 0 ? '40vh' : currentScene === 4 ? '50vh' : '15vh',
          scale: currentScene === 0 ? 1 : currentScene === 4 ? 1.5 : 0.6,
          rotate: currentScene === 0 ? 15 : currentScene === 4 ? 0 : 45,
          opacity: currentScene === 0 ? 0 : currentScene === 2 ? 0.3 : currentScene === 4 ? 0 : 0.5,
        }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <RosemarySvg className="w-[20vh] h-[40vh] -ml-[10vh] -mt-[20vh]" pathLength={1} />
      </motion.div>

      {/* Scene Content */}
      <AnimatePresence mode="sync">
        {currentScene === 0 && <Scene1 key="abertura" />}
        {currentScene === 1 && <Scene2 key="oNome" />}
        {currentScene === 2 && <Scene3 key="asSeries" />}
        {currentScene === 3 && <Scene4 key="oArquivo" />}
        {currentScene === 4 && <Scene5 key="fecho" />}
      </AnimatePresence>
    </div>
  );
}
