import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "./cn";

export const TextGenerateEffect = ({
  words,
  className,
}) => {
  const scopeRef = useRef(null);
  const animate = useAnimation();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate.start("visible");
  }, []);

  const renderWords = () => {
    return (
      <motion.div ref={scopeRef}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 2,
                delay: idx * 0.2,
              }}
              className="dark:text-white text-black opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
