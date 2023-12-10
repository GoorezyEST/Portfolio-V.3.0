"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/home.module.css";
import Navbar from "./components/units/navbar";
import { FeaturedWorkList } from "@/data/FeaturedWork";
import {
  FreelancerWorkListEN,
  FreelancerWorkListES,
} from "@/data/FreelancerWork";
import Link from "next/link";
import { ResizeImgurImages } from "@/functions/Utilities";
import { motion } from "framer-motion";
import Footer from "./components/units/footer";
import { useGlobal } from "@/contexts/GlobalContext";

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
        <span>FRANCO ESPINOSA</span>
        <h1>{lang === "es" ? "DESARROLLO WEB" : "WEB DEVELOPER"}</h1>
      </motion.div>

      <section className={styles.featured_work}>
        <motion.div
          className={styles.featured_work_text}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <div className={styles.featured_work_title}>
            {lang === "es" ? (
              <>
                <span>DESCUBRA MI</span>
                <h2>TRABAJO DESTACADO</h2>
              </>
            ) : (
              <>
                <span>CHECK OUT MY</span>
                <h2>FEATURED WORK</h2>
              </>
            )}
          </div>
          <Link href="#">LOOK ALL MY WORK</Link>
        </motion.div>
        <div className={styles.featured_work_content}>
          {FeaturedWorkList.map((work, index) => {
            return (
              <motion.a
                href={work.project_url}
                target="_blank"
                className={styles.featured_work_card}
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.125,
                  duration: 0.275,
                  ease: "easeInOut",
                }}
              >
                <div
                  className={styles.featured_work_card_inner}
                  onMouseEnter={() => {
                    randomTextRevealEnter(work.title);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                  }}
                >
                  <div
                    className={styles.featured_work_card_front}
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
                  <div className={styles.featured_work_card_back}>
                    <p>{textReveal}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className={styles.freelancer_work}>
        <motion.div
          className={styles.freelancer_work_title}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          {lang === "es" ? (
            <>
              <span>MI TRABAJO COMO</span>
              <h3>FREELANCER</h3>
            </>
          ) : (
            <>
              <span>MY WORK AS A</span>
              <h3>FREELANCER</h3>
            </>
          )}
        </motion.div>
        <div className={styles.freelancer_work_content}>
          {(lang === "es" ? FreelancerWorkListES : FreelancerWorkListEN).map(
            (work, index) => {
              return (
                <div
                  className={styles.freelancer_work_content_item}
                  key={index}
                >
                  <div className={styles.freelancer_work_content_item_text}>
                    <motion.span
                      initial={{ opacity: 0, x: "16px" }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.125,
                        duration: 0.275,
                        ease: "easeInOut",
                      }}
                    >
                      {work.title}
                    </motion.span>
                    <motion.p
                      initial={{ opacity: 0, x: "16px" }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.125,
                        duration: 0.275,
                        ease: "easeInOut",
                      }}
                    >
                      {work.first_text}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: "16px" }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.125,
                        duration: 0.275,
                        ease: "easeInOut",
                      }}
                    >
                      {work.second_text}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: "16px" }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.125,
                        duration: 0.275,
                        ease: "easeInOut",
                      }}
                    >
                      {work.third_text}
                    </motion.p>
                  </div>
                  <motion.a
                    href={work.website_url}
                    target="_blank"
                    className={styles.freelance_work_card}
                    key={index}
                    initial={{ opacity: 0, x: "-16px" }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className={styles.freelance_work_card_inner}
                      onMouseEnter={() => {
                        randomTextRevealEnter(work.title);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave();
                      }}
                    >
                      <div
                        className={styles.featured_work_card_front}
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
                      <div className={styles.featured_work_card_back}>
                        <p>{textReveal}</p>
                      </div>
                    </div>
                  </motion.a>
                </div>
              );
            }
          )}
        </div>
      </section>

      <section className={styles.about_me}>
        <motion.div
          className={styles.about_me_title}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          {lang === "es" ? (
            <>
              <span>UN POCO</span>
              <h4>SOBRE MI</h4>
            </>
          ) : (
            <>
              <span>A LITTLE BIT</span>
              <h4>ABOUT ME</h4>
            </>
          )}
        </motion.div>
        <div className={styles.about_me_content}>
          <div className={styles.about_me_content_text}>
            <motion.p
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              {lang === "es"
                ? "Soy Franco Espinosa, de Mar del Plata, Argentina. Comencé mi programación en diciembre de 2021 bajo la tutela de mi primo Marcos primo Marcos Espinosa, desarrollador Backend."
                : "I'm Franco Espinosa, from Mar del Plata, Argentina. I started my programming journey in December 2021 under the tutelage of my cousin Marcos Espinosa, a Backend developer."}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              {lang === "es"
                ? "A lo largo de estos años he desarrollado varios proyectos, así como así como algunos trabajos como Freelance."
                : "Throughout these years I have developed various projects, as well as doing some work as a Freelancer."}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              {lang === "es"
                ? "Empecé bajo su guía estudiando C con el editor de texto conocido como como VIM. Luego completé varios cursos de FreeCodeCamp, Udemy, Platzi y otros."
                : "I began under his guidance studying C with the text editor known as VIM. Then I completed various courses from FreeCodeCamp, Udemy, Platzi and others."}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              {lang === "es"
                ? "Hasta la fecha, he estudiado una amplia gama de lenguajes, bases de datos, lenguajes de consulta, frameworks, patrones de diseño y otros conceptos relacionados con el campo."
                : "To this date, I have studied a wide range of languages, databases, query languages, frameworks, design patterns and other concepts related to the field."}
            </motion.p>
            <motion.a
              href="#"
              role="button"
              initial={{ opacity: 0, x: "16px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              {lang === "es" ? "TECNOLOGÍAS" : "MY TECH STACK"}
            </motion.a>
          </div>
          <motion.div
            className={styles.about_me_content_image}
            style={{
              backgroundImage: `url(${ResizeImgurImages(
                "https://i.imgur.com/UueGXXr.png"
              )})`,
            }}
            initial={{ opacity: 0, x: "-16px" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            <img
              src="https://i.imgur.com/UueGXXr.png"
              alt="Mar del Plata image"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
