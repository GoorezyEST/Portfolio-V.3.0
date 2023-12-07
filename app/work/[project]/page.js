"use client";

import React, { useEffect, useState } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import { AllWorkList } from "@/data/AllWork";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/units/navbar";
import Footer from "@/app/components/units/footer";
import { motion } from "framer-motion";
import styles from "@/styles/modules/project.module.css";
import { ResizeImgurImages } from "@/functions/Utilities";

function ProjectPage({ params }) {
  const { setIsHydrated } = useGlobal();

  const [project, setProject] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Function to execute before rendering
    function executeBeforeRender() {
      if (isA2022Project.length > 0 || isA2023Project.length > 0) {
        if (isA2022Project.length > 0) {
          setProject(isA2022Project[0]);
        }
        if (isA2023Project.length > 0) {
          setProject(isA2023Project[0]);
        }
        setTimeout(() => {
          setIsHydrated(false);
        }, 1000);
      } else {
        router.push("/work");
      }
    }

    const isA2023Project = AllWorkList[0].projects.filter(
      (el) => el.extra_url === params.project
    );
    const isA2022Project = AllWorkList[1].projects.filter(
      (el) => el.extra_url === params.project
    );

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
      {project === null ? (
        <section className={styles.loading}></section>
      ) : (
        <section className={styles.content}>
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
            <span>KNOW MORE ABOUT</span>
            <h1>{project.title.toUpperCase()}</h1>
          </motion.div>
          <motion.div
            className={styles.page_image}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            <img src={project.extra_img} />
          </motion.div>
          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 0.125,
              duration: 0.275,
              ease: "easeInOut",
            }}
          >
            <a href={project.proyect_url} target="_blank">
              <button className={styles.primary_cta}>See demo</button>
            </a>
            <a href="/work">
              <button className={styles.secondary_cta}>Go back</button>
            </a>
          </motion.div>
        </section>
      )}
      <Footer />
    </main>
  );
}

export default ProjectPage;
