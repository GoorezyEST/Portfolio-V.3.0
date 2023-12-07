"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/modules/work.module.css";
import { motion } from "framer-motion";
import Navbar from "../components/units/navbar";
import Footer from "../components/units/footer";
import { AllWorkList } from "@/data/AllWork";
import { ResizeImgurImages } from "@/functions/Utilities";
import { useGlobal } from "@/contexts/GlobalContext";

function WorkPage() {
  const { setIsHydrated } = useGlobal();

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
        <span>START EXPLORING ALL</span>
        <h1>MY WORK</h1>
      </motion.div>

      {AllWorkList.map((item, index) => {
        return (
          <div className={styles.work_list} key={index}>
            <motion.div
              className={styles.work_list_title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              <span>YEAR</span>
              <h2>{item.year.toString().toUpperCase()}</h2>
            </motion.div>
            {item.projects.map((work, i) => {
              return (
                <motion.div
                  className={styles.work_list_item}
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 0.125,
                    duration: 0.275,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.work_list_item_text}>
                    <span>{work.title}</span>
                    <p>{work.first_text}</p>
                    <p>{work.second_text}</p>
                    <div className={styles.work_list_item_text_buttons}>
                      <a href={work.proyect_url} target="_blank">
                        <button className={styles.cta_primary}>See demo</button>
                      </a>
                      {work.extra && (
                        <a href={`work/${work.extra_url}`}>
                          <button className={styles.cta_secondary}>
                            More info
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.work_list_item_image}
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
                </motion.div>
              );
            })}
          </div>
        );
      })}

      <Footer />
    </main>
  );
}

export default WorkPage;
