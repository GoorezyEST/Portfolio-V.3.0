"use client";

import React, { useEffect } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import Navbar from "./components/units/navbar";
import styles from "@/styles/modules/404.module.css";
import Link from "next/link";

function NotFound() {
  const { setIsHydrated, lang } = useGlobal();

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

  return (
    <main className="wrapper">
      <section className={styles.content_wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>Error 404:</span>
            <h1>
              {lang === "es"
                ? "Esta página no existe"
                : "This page doesn't exist"}
            </h1>
          </div>
          <Link href="/">{lang === "es" ? "Regresar" : "Go back"}</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
