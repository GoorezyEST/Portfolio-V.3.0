"use client";

import React, { useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { AnimatePresence, motion } from "framer-motion";
import LogoIcon from "@/app/components/icons/LogoIcon";
import Lenis from "@studio-freight/lenis";

function LoadingScreen({ children }) {
  const { isHydrated } = useGlobal();

  useEffect(() => {
    if (isHydrated) {
      document.body.style.overflowY = "hidden";
    } else {
      // If isHydrated is false, enable scrolling
      setTimeout(() => {
        document.body.style.overflowY = "scroll";
      }, 515);
    }
  }, [isHydrated]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isHydrated && (
          <motion.div
            className="transition"
            initial={{
              backgroundColor: "rgba(0,0,0,0)",
            }}
            animate={{
              backgroundColor: "var(--black)",
              transition: {
                duration: 0.15,
                ease: "linear",
              },
            }}
            exit={{
              backgroundColor: "rgba(0,0,0,0)",
              transition: {
                delay: 0.3,
                duration: 0.15,
                ease: "linear",
              },
            }}
          >
            <motion.div
              className="transition-top"
              initial={{
                x: "100%",
              }}
              animate={{
                x: "0%",
                transition: {
                  delay: 0.15,
                  duration: 0.375,
                  ease: "linear",
                },
              }}
              exit={{
                x: "-100%",
                transition: {
                  delay: 0.3,
                  duration: 0.375,
                  ease: "linear",
                },
              }}
            ></motion.div>
            <motion.div
              className="transition-logo"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.395,
                  duration: 0.325,
                  ease: "linear",
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.325,
                  ease: "linear",
                },
              }}
            >
              <LogoIcon />
            </motion.div>
            <motion.div
              className="transition-bottom"
              initial={{
                x: "-100%",
              }}
              animate={{
                x: "0%",
                transition: {
                  delay: 0.15,
                  duration: 0.375,
                  ease: "linear",
                },
              }}
              exit={{
                x: "100%",
                transition: {
                  delay: 0.3,
                  duration: 0.375,
                  ease: "linear",
                },
              }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

export default LoadingScreen;
