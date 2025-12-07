import { useGlobal } from "@/contexts/GlobalContext";
import React, { useState, useEffect } from "react";
import styles from "@/styles/modules/project-data.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

function FreelanceData({ data }) {
  const { lang } = useGlobal();

  const information = data.slice(1, data.length - 1);

  const [bannerImageLoaded, setBannerImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();

    const loadImage = () => {
      setBannerImageLoaded(false);

      image.onload = () => {
        setBannerImageLoaded(true);
      };

      image.src = data[0].banner;
    };

    loadImage();
  }, []);

  const [imageStates, setImageStates] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      const newImageStates = [];

      information.forEach((item, index) => {
        const image = new Image();

        image.onload = () => {
          newImageStates[index] = true;
          setImageStates([...newImageStates]);
        };

        image.onerror = () => {
          newImageStates[index] = false;
          setImageStates([...newImageStates]);
        };

        image.src = item.img;
      });

      setImageStates([...newImageStates]);
    };

    loadImages();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.outter_welcome}>
        <div className={styles.inner_welcome}>
          <img src={data[0].banner} alt={`${data[0].title} banner image`} />
          <div
            className={styles.project_image_loading}
            style={{ opacity: !bannerImageLoaded ? "1" : "0" }}
          >
            <span className={styles.project_image_loader}></span>
          </div>
          <div className={styles.welcome_title}>
            <h1>{data[0].title}</h1>
          </div>
        </div>
      </div>
      {information.map((info, index) => {
        const formattedText = info.text.split("\n");

        return (
          <div
            key={index}
            className={`${styles.project_information} ${
              info.side === "left" ? styles.left : styles.right
            } ${index === 0 ? styles.first_info : ""}`}
          >
            <motion.div
              className={styles.project_information_image}
              initial={{ opacity: 0, x: info.side === "left" ? "-8px" : "8px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              <img src={info.img} alt={`${data[0].title} informative image`} />
              <div
                className={styles.project_image_loading}
                style={{ opacity: !imageStates[index] ? "1" : "0" }}
              >
                <span className={styles.project_image_loader}></span>
              </div>
            </motion.div>
            <motion.div
              className={styles.project_information_text}
              initial={{ opacity: 0, x: info.side === "left" ? "8px" : "-8px" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.125,
                duration: 0.275,
                ease: "easeInOut",
              }}
            >
              <h2>
                <span>{info.title}</span>
              </h2>
              {formattedText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </motion.div>
          </div>
        );
      })}
      <motion.div
        className={styles.end}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        {data[data.length - 1].project !== "OFF_SERVICE" && (
          <Link href={data[data.length - 1].project} target="_blank">
            <button className={styles.primary_cta}>
              <span>{lang === "es" ? "Pruebalo" : "Try it out"}</span>
            </button>
          </Link>
        )}
        <Link href="/">
          <button className={styles.secondary_cta}>
            <span>{lang === "es" ? "Regresar" : "Go back"}</span>
          </button>
        </Link>
      </motion.div>
    </section>
  );
}

export default FreelanceData;
