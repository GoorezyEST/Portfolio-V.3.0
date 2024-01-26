"use client";

import React, { useEffect, useState, useRef } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/units/navbar";
import Footer from "@/app/components/units/footer";
import { motion } from "framer-motion";
import styles from "@/styles/modules/project.module.css";
import { AllFreelanceWorkExtra } from "@/data/FreelancerWork";
import FreelanceData from "@/app/components/units/FreelanceData";

const variants = {
  visible: { y: 0 },
  hide: { y: -100 },
};

function FreelanceSingleProjectPage({ params }) {
  const { setIsHydrated, lang, setMobileMenuOpen } = useGlobal();

  const [project, setProject] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Function to execute before rendering
    function executeBeforeRender() {
      if (workExists.length > 0) {
        setProject(workExists[0]);

        setTimeout(() => {
          window.scrollTo({ top: 0 });
          setIsHydrated(false);
        }, 1000);
      } else {
        router.push("/work");
      }
    }

    const workExists = AllFreelanceWorkExtra.filter(
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
              {lang === "es" ? "TRABAJO FREELANCE" : "FREELANCE WORK"}
            </span>
            <h1>{project.title.toUpperCase()}</h1>
          </motion.div>

          {lang === "es" ? (
            <FreelanceData data={project.extra_data.es} />
          ) : (
            <FreelanceData data={project.extra_data.en} />
          )}
        </section>
      )}
      <Footer />
    </main>
  );
}

export default FreelanceSingleProjectPage;
