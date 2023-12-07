"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/modules/home.module.css";
import Navbar from "./components/units/navbar";
import { FeaturedWorkList } from "@/data/FeaturedWork";
import { FreelancerWorkList } from "@/data/FreelancerWork";
import Link from "next/link";
import { ResizeImgurImages } from "@/functions/Utilities";
import { motion } from "framer-motion";
import Footer from "./components/units/footer";
import { useGlobal } from "@/contexts/GlobalContext";

export default function Home() {
  const { setIsHydrated } = useGlobal();

  useEffect(() => {
    // Function to execute before rendering
    function executeBeforeRender() {
      setTimeout(() => {
        setIsHydrated(false);
      }, 500);
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

  return (
    <main className="wrapper">
      <Navbar />

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
        <h1>WEB DEVELOPER</h1>
      </motion.div>

      <section className={styles.featured_work}>
        <motion.div
          className={styles.featured_work_text}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <div className={styles.featured_work_title}>
            <span>CHECK OUT MY</span>
            <h2>FEATURED WORK</h2>
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
                <div className={styles.featured_work_card_inner}>
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
                    <p>{work.title.toUpperCase()}</p>
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <span>MY WORK AS A</span>
          <h3>FREELANCER</h3>
        </motion.div>
        <div className={styles.freelancer_work_content}>
          {FreelancerWorkList.map((work, index) => {
            return (
              <div className={styles.freelancer_work_content_item} key={index}>
                <div className={styles.freelancer_work_content_item_text}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    {work.title}
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    {work.first_text}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.125,
                      duration: 0.275,
                      ease: "easeInOut",
                    }}
                  >
                    {work.second_text}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
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
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 0.125,
                    duration: 0.275,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.freelance_work_card_inner}>
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
                      <p>{work.title.toUpperCase()}</p>
                    </div>
                  </div>
                </motion.a>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.about_me}>
        <motion.div
          className={styles.about_me_title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <span>A LITTLE BIT</span>
          <h4>ABOUT ME</h4>
        </motion.div>
        <div className={styles.about_me_content}>
          <div className={styles.about_me_content_text}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              I'm Franco Espinosa, from Mar del Plata, Argentina. I started my
              programming journey in December 2021 under the tutelage of my
              cousin Marcos Espinosa, a Backend developer.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              Throughout these years I have developed various projects, as well
              as doing some work as a Freelancer.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              I began under his guidance studying C with the text editor known
              as VIM. Then I completed various courses from FreeCodeCamp, Udemy,
              Platzi and others.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              To this date, I have studied a wide range of languages, databases,
              query languages, frameworks, design patterns and other concepts
              related to the field.
            </motion.p>
            <motion.a
              href="#"
              role="button"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              MY TECH STACK
            </motion.a>
          </div>
          <motion.div
            className={styles.about_me_content_image}
            style={{
              backgroundImage: `url(${ResizeImgurImages(
                "https://i.imgur.com/U3TyRY4.png"
              )})`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            <img
              src="https://i.imgur.com/U3TyRY4.png"
              alt="Mar del Plata image"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
