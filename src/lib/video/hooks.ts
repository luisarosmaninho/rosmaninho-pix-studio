import { useEffect, useRef, useState } from "react";

type SceneDurations = Record<string, number>;

export function useVideoPlayer({ durations }: { durations: SceneDurations }) {
  const keys = Object.keys(durations);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const isFirstPass = useRef(true);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      if (typeof window !== "undefined" && typeof (window as any).startRecording === "function") {
        (window as any).startRecording();
      }
    }

    const key = keys[currentSceneIndex];
    const duration = durations[key];

    const timer = setTimeout(() => {
      const nextIndex = currentSceneIndex + 1;
      if (nextIndex >= keys.length) {
        if (isFirstPass.current) {
          isFirstPass.current = false;
          if (typeof window !== "undefined" && typeof (window as any).stopRecording === "function") {
            (window as any).stopRecording();
          }
        }
        setCurrentSceneIndex(0);
      } else {
        setCurrentSceneIndex(nextIndex);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSceneIndex]);

  return { currentScene: currentSceneIndex };
}
