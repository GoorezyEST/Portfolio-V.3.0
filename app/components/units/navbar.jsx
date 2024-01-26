import React, { useEffect, useState, useRef } from "react";
import LogoIcon from "../icons/LogoIcon";
import Link from "next/link";
import styles from "@/styles/modules/navbar.module.css";
import { motion } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";
import SpanishFlag from "../icons/SpanishFlag";
import EnglishFlag from "../icons/EnglishFlag";
import CloseIcon from "../icons/CloseIcon";
import HamburgerIcon from "../icons/HamburgerIcon";

function Navbar() {
  const { lang, toggleLang, mobileMenuOpen, setMobileMenuOpen } = useGlobal();

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={styles.navigator}>
      <div className={styles.navigator_logo}>
        <LogoIcon />
      </div>
      <div className={styles.mobile}>
        <div
          className={styles.mobile_icon}
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
        >
          {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </div>
        <div
          className={styles.mobile_menu}
          ref={mobileMenuRef}
          style={{ transform: mobileMenuOpen ? "scale(1)" : "scale(0)" }}
        >
          <ul>
            <li>
              <Link
                href="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {lang === "es" ? "INICIO" : "HOME"}
              </Link>
            </li>
            <li>
              <Link
                href="/proyects"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {lang === "es" ? "PROYECTOS" : "PROJECTS"}
              </Link>
            </li>
            <li>
              <Link
                href="/techs"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {lang === "es" ? "TECNOS" : "TECHS"}
              </Link>
            </li>
            <li>
              <div
                className={styles.navigator_language_mobile}
                onClick={() => {
                  toggleLang();
                }}
              >
                <div className={styles.navigator_language_mobile_flag}>
                  {lang === "es" ? <EnglishFlag /> : <SpanishFlag />}
                </div>
                <span>{lang === "es" ? "INGLÉS" : "SPANISH"}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.navigator_links_desktop}>
        <Link href="/">{lang === "es" ? "INICIO" : "HOME"}</Link>
        <Link href="/proyects">{lang === "es" ? "PROYECTOS" : "PROJECTS"}</Link>
        <Link href="/techs">{lang === "es" ? "TECNOS" : "TECHS"}</Link>
        <div
          className={styles.navigator_language_desktop}
          onClick={() => {
            toggleLang();
          }}
        >
          <div className={styles.navigator_language_desktop_flag}>
            {lang === "es" ? <EnglishFlag /> : <SpanishFlag />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
