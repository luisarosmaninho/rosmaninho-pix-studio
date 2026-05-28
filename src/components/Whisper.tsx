import { motion } from "framer-motion";

type WhisperProps = {
  text: string;
  delay?: number;
  className?: string;
  style?: "mono" | "italic";
};

/**
 * A barely-visible phrase that fades in slowly when scrolled into view.
 * Acts as atmospheric texture — never distracting, always poetic.
 */
export function Whisper({ text, delay = 1, className = "", style = "mono" }: WhisperProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 3.2, delay, ease: "easeOut" }}
      aria-hidden="true"
      className={`select-none pointer-events-none ${
        style === "italic"
          ? "font-italic-serif text-sm text-foreground/20"
          : "font-mono-label text-[9px] tracking-[0.42em] uppercase text-foreground/18"
      } ${className}`}
    >
      {text}
    </motion.p>
  );
}

/** Same as Whisper but in cream, for use on dark backgrounds */
export function WhisperLight({ text, delay = 1, className = "", style = "mono" }: WhisperProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 3.2, delay, ease: "easeOut" }}
      aria-hidden="true"
      className={`select-none pointer-events-none ${
        style === "italic"
          ? "font-italic-serif text-sm text-cream/20"
          : "font-mono-label text-[9px] tracking-[0.42em] uppercase text-cream/18"
      } ${className}`}
    >
      {text}
    </motion.p>
  );
}
