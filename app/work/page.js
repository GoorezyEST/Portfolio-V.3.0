"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/modules/work.module.css";
import { motion } from "framer-motion";
import Navbar from "../components/units/navbar";
import Footer from "../components/units/footer";
import { AllWorkList } from "@/data/AllWork";
import { ResizeImgurImages } from "@/functions/Utilities";
import { useGlobal } from "@/contexts/GlobalContext";

const variants = {
  visible: { y: 0 },
  hide: { y: -100 },
};

function WorkPage() {
  const { setIsHydrated, lang } = useGlobal();

  useEffect(() => {
    // Function to execute before rendering
    function executeBeforeRender() {
      setTimeout(() => {
        setIsHydrated(false);
      }, 1000);
    }

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      executeBeforeRender();
    } else {
      // Use the 'load' event to execute the code once the page is loaded
      window.addEventListener("load", executeBeforeRender);
    }

    return () => {
      window.removeEventListener("load", executeBeforeRender);
      setIsHydrated(true);
    };
  }, []);

  const [textReveal, setTextReveal] = useState(null);
  const [revealInterval, setRevealInterval] = useState(null);

  const randomTextRevealEnter = (text) => {
    setTimeout(() => {
      const symbols = "!-@+#=$X%&?";

      let placeholder = "";

      for (let i = 0; i < text.length; i++) {
        placeholder += symbols[Math.floor(Math.random() * symbols.length)];
      }

      setTextReveal(placeholder);

      let currentIndex = 0;

      const revealInterval = setInterval(() => {
        if (currentIndex < text.length) {
          placeholder =
            placeholder.substring(0, currentIndex) +
            text[currentIndex].toUpperCase() +
            placeholder.substring(currentIndex + 1);

          setTextReveal(placeholder);
          currentIndex++;
        } else {
          clearInterval(revealInterval);
        }
      }, 40);

      setRevealInterval(revealInterval);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearInterval(revealInterval);
    setTextReveal(null);
  };

  useEffect(() => {
    return () => {
      clearInterval(revealInterval);
      setTextReveal(null);
    };
  }, [revealInterval]);

  const [showNav, setShowNav] = useState(true);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition.current) {
        if (showNav) {
          setShowNav(false);
        }
      } else {
        if (!showNav) {
          setShowNav(true);
        }
      }
      lastScrollPosition.current = currentScrollPosition;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showNav]);

  return (
    <main className="wrapper">
      <motion.div
        className="navbar_wrapper"
        animate={showNav ? "visible" : "hide"}
        variants={variants}
        transition={{
          duration: 0.35,
        }}
      >
        <Navbar />
      </motion.div>
      <motion.div
        className="page_title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        <span>{lang === "es" ? "EXPLORA TODO" : "EXPLORE ALL"}</span>
        <h1>{lang === "es" ? "MI TRABAJO" : "MY WORK"}</h1>
      </motion.div>

      {AllWorkList.map((item, index) => {
        return (
          <div className={styles.featured_work} key={index}>
            <motion.div
              className={styles.featured_work_title}
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              <span>{lang === "es" ? "AÑO" : "YEAR"}</span>
              <h2>{item.year.toString().toUpperCase()}</h2>
            </motion.div>
            <div className={styles.featured_work_bento}>
              {item.projects.map((work, i) => {
                return (
                  <motion.a
                    className={styles.fatured_work_bento_card}
                    key={i}
                    href={
                      work.extra ? `work/${work.extra_url}` : work.proyect_url
                    }
                    target={work.extra ? "_self" : "_blank"}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className={styles.featured_bento_card_inner}
                      onMouseEnter={() => {
                        randomTextRevealEnter(work.title);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave();
                      }}
                    >
                      <div
                        className={styles.featured_bento_card_front}
                        style={{
                          backgroundImage: `url(${ResizeImgurImages(
                            work.image_url
                          )})`,
                        }}
                      >
                        <img
                          src={work.image_url}
                          alt={`${work.title} banner image`}
                        />
                      </div>
                      <div className={styles.featured_bento_card_back}>
                        <p>{textReveal}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        );
      })}

      <Footer />
    </main>
  );
}

export default WorkPage;
