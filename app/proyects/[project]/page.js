"use client";

import React, { useEffect, useState, useRef } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import { AllWorkList } from "@/data/AllWork";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/units/navbar";
import Footer from "@/app/components/units/footer";
import { motion } from "framer-motion";
import styles from "@/styles/modules/project.module.css";
import ProjectData from "@/app/components/units/ProjectData";

const variants = {
  visible: { y: 0 },
  hide: { y: -100 },
};

function ProjectPage({ params }) {
  const { setIsHydrated, lang, setMobileMenuOpen } = useGlobal();

  const [project, setProject] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Function to execute before rendering
    function executeBeforeRender() {
      if (
        isA2022Project.length > 0 ||
        isA2023Project.length > 0 ||
        isA2024Project.length > 0
      ) {
        if (isA2022Project.length > 0) {
          setProject(isA2022Project[0]);
        }
        if (isA2023Project.length > 0) {
          setProject(isA2023Project[0]);
        }
        if (isA2024Project.length > 0) {
          setProject(isA2024Project[0]);
        }
        setTimeout(() => {
          window.scrollTo({ top: 0 });
          setIsHydrated(false);
        }, 1000);
      } else {
        router.push("/work");
      }
    }

    const isA2024Project = AllWorkList[0].projects.filter(
      (el) => el.extra_url === params.project
    );
    const isA2023Project = AllWorkList[1].projects.filter(
      (el) => el.extra_url === params.project
    );
    const isA2022Project = AllWorkList[2].projects.filter(
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
      setIsHydrated(true);
      window.removeEventListener("load", executeBeforeRender);
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
            <span>
              {lang === "es" ? "CONOCE MÁS SOBRE" : "KNOW MORE ABOUT"}
            </span>
            <h1>{project.title.toUpperCase()}</h1>
          </motion.div>

          {lang === "es" ? (
            <ProjectData data={project.extra_data.es} />
          ) : (
            <ProjectData data={project.extra_data.en} />
          )}
        </section>
      )}
      <Footer />
    </main>
  );
}

export default ProjectPage;
