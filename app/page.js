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
import EyeIcon from "./components/icons/EyeIcon";

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
        window.scrollTo({ top: 0 });
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

  const [imageStates, setImageStates] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      const newImageStates = [];

      FeaturedWorkList.forEach((project, index) => {
        const image = new Image();

        image.onload = () => {
          newImageStates[index] = true;
          setImageStates([...newImageStates]);
        };

        image.onerror = () => {
          newImageStates[index] = false;
          setImageStates([...newImageStates]);
        };

        image.src = project.image_url;
      });

      setImageStates([...newImageStates]);
    };

    loadImages();
  }, [lang]);

  const [freelancerImagesState, setFreelancerImagesState] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      const newImageStates = [];

      if (lang === "es") {
        FreelancerWorkListES.forEach((project, index) => {
          const image = new Image();

          image.onload = () => {
            newImageStates[index] = true;
            setFreelancerImagesState([...newImageStates]);
          };

          image.onerror = () => {
            newImageStates[index] = false;
            setFreelancerImagesState([...newImageStates]);
          };

          image.src = project.image_url;
        });

        setFreelancerImagesState([...newImageStates]);
      }

      if (lang === "en") {
        FreelancerWorkListEN.forEach((project, index) => {
          const image = new Image();

          image.onload = () => {
            newImageStates[index] = true;
            setFreelancerImagesState([...newImageStates]);
          };

          image.onerror = () => {
            newImageStates[index] = false;
            setFreelancerImagesState([...newImageStates]);
          };

          image.src = project.image_url;
        });

        setFreelancerImagesState([...newImageStates]);
      }
    };
    loadImages();
  }, [lang]);

  const [aboutImage, setAboutImage] = useState(false);

  useEffect(() => {
    const image = new Image();

    const loadImage = () => {
      setAboutImage(false);

      image.onload = () => {
        setAboutImage(true);
      };

      image.src = "https://i.imgur.com/UueGXXr.png";
    };

    loadImage();
  }, []);

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
        <div className={styles.featured_work_text}>
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
            {lang === "es" ? (
              <>
                <span>DESCUBRA MIS</span>
                <h2>PROYECTOS DESTACADO</h2>
              </>
            ) : (
              <>
                <span>CHECK OUT MY</span>
                <h2>FEATURED PROJECTS</h2>
              </>
            )}
          </motion.div>
          <motion.div
            className={styles.featured_work_link}
            initial={{ opacity: 0, x: "-16px" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            <Link href="/projects">
              {lang === "es" ? "TODOS MIS PROYECTOS" : "ALL MY PROJECTS"}
            </Link>
          </motion.div>
        </div>
        <div className={styles.featured_work_content}>
          {FeaturedWorkList.map((work, index) => {
            return (
              <Link href={work.project_url} target={work.target} key={index}>
                <motion.div
                  className={styles.featured_work_card}
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
                    <div className={styles.featured_work_card_front}>
                      {!imageStates && (
                        <div className={styles.loading_front_card}>
                          <span className="loader"></span>
                        </div>
                      )}
                      <img
                        src={work.image_url}
                        alt={`${work.title} banner image`}
                      />
                    </div>
                    <div className={styles.featured_work_card_back}>
                      <p>{textReveal}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
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
                    {work.text.map((text, j) => (
                      <motion.p
                        key={j}
                        initial={{ opacity: 0, x: "16px" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.125,
                          duration: 0.275,
                          ease: "easeInOut",
                        }}
                      >
                        {text}
                      </motion.p>
                    ))}
                    <Link
                      href={`/freelance/${work.extra_url}`}
                      className={styles.freelancer_work_content_item_button}
                    >
                      <motion.button
                        initial={{ opacity: 0, x: "16px" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.125,
                          duration: 0.275,
                          ease: "easeInOut",
                        }}
                      >
                        <span>{lang === "es" ? "Ver más" : "See more"}</span>
                      </motion.button>
                    </Link>
                  </div>
                  <motion.div
                    className={
                      styles.freelancer_work_content_item_image_container
                    }
                    initial={{ opacity: 0, x: "-16px" }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    <Link
                      href={`/freelance/${work.extra_url}`}
                      className={styles.freelancer_work_content_item_image}
                    >
                      {!freelancerImagesState[index] && (
                        <div
                          className={
                            styles.freelancer_work_content_item_image_loading
                          }
                        >
                          <span className="loader"></span>
                        </div>
                      )}
                      <img
                        src={work.image_url}
                        alt={
                          lang === "es"
                            ? "Una imagen del trabajo"
                            : "A image of the work"
                        }
                      />
                      <div
                        className={
                          styles.freelancer_work_content_item_image_hover
                        }
                      >
                        <EyeIcon />
                      </div>
                    </Link>
                  </motion.div>
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
                ? "Soy Franco Espinosa, de Mar del Plata, Argentina. Comencé a programar en 2021 bajo la tutela de mi primo Marcos Espinosa, desarrollador Backend."
                : "I'm Franco Espinosa, from Mar del Plata, Argentina. I started my programming journey in 2021 under the tutelage of my cousin Marcos Espinosa, a Backend developer."}
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
                ? "A lo largo de estos años he desarrollado varios proyectos, así como también algunos trabajos como Freelance."
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
                ? "Hasta la fecha, he estudiado una amplia gama de lenguajes, bases de datos, lenguajes de consulta, frameworks, patrones de diseño y otros conceptos relacionados con el campo."
                : "To this date, I have studied a wide range of languages, databases, query languages, frameworks, design patterns and other concepts related to the field."}
            </motion.p>
            <Link href="/techs">
              <motion.button
                initial={{ opacity: 0, x: "16px" }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.125,
                  duration: 0.275,
                  ease: "easeInOut",
                }}
              >
                <span>{lang === "es" ? "TECNOLOGÍAS" : "MY TECH STACK"}</span>
              </motion.button>
            </Link>
          </div>
          <motion.div
            className={styles.about_me_content_image}
            initial={{ opacity: 0, x: "-16px" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            {!aboutImage && (
              <div className={styles.loading_about}>
                <span className="loader"></span>
              </div>
            )}
            <img
              src="https://i.ibb.co/6sNs337/Uue-GXXr-1.webp"
              alt="Mar del Plata image"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
