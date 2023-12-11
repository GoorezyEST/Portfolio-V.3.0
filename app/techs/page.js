"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/units/navbar";
import { motion } from "framer-motion";
import Footer from "../components/units/footer";
import { useGlobal } from "@/contexts/GlobalContext";
import { getTechIcon } from "@/functions/Utilities";
import { TechnologiesList } from "@/data/Technologies";
import styles from "@/styles/modules/technologies.module.css";

const variants = {
  visible: { y: 0 },
  hide: { y: -100 },
};

export default function Home() {
  const { setIsHydrated, lang, setMobileMenuOpen } = useGlobal();

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

  const [showNav, setShowNav] = useState(true);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition.current) {
        if (showNav) {
          setShowNav(false);
          setMobileMenuOpen(false);
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
        <span>{lang === "es" ? "COMPETENCIAS" : "TECHNICAL"}</span>
        <h1>{lang === "es" ? "TÉCNICAS" : "SKILLS"}</h1>
      </motion.div>

      {TechnologiesList.map((stack, first_index) => {
        return (
          <div className={styles.techs_container} key={first_index}>
            <motion.div
              className={styles.techs_title}
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              <span>STACK</span>
              <h2>
                {lang === "es"
                  ? stack.stack_es.toUpperCase()
                  : stack.stack_en.toUpperCase()}
              </h2>
            </motion.div>

            <div className={styles.tech_grid}>
              {stack.list.map((item, second_index) => {
                const ItemIcon = getTechIcon(item.icon);

                return (
                  <motion.div
                    className={styles.techs_grid_item}
                    key={second_index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={styles.techs_grid_item_title}>
                      <ItemIcon />
                      <h3>{item.title}</h3>
                    </div>
                    <p>{lang === "es" ? item.text_es : item.text_en}</p>
                  </motion.div>
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
