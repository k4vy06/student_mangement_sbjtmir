import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.05, 1];
  };

  // Reduced rotation for a cleaner admin dashboard look (from 20 to 10)
  const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-10 w-full"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-4xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        // Reduced shadow intensity for a cleaner look
        boxShadow: "0 10px 40px -10px rgba(59, 130, 246, 0.15)",
      }}
      className="max-w-5xl -mt-4 md:-mt-8 mx-auto h-[25rem] md:h-[35rem] w-full border-4 border-white/50 p-2 md:p-4 bg-white/80 backdrop-blur-sm rounded-[24px] md:rounded-[32px]"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-100">
        {children}
      </div>
    </motion.div>
  );
};
