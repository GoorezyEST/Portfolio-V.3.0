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
          style={{ transform: mobileMenuOpen ? "scale(1)" : "scale(0)" }}
        >
          <ul>
            <li>
              <Link href="/">{lang === "es" ? "INICIO" : "HOME"}</Link>
            </li>
            <li>
              {" "}
              <Link href="/work">{lang === "es" ? "TRABAJO" : "WORK"}</Link>
            </li>
            <li>
              {" "}
              <Link href="/techs">{lang === "es" ? "TECNOS" : "TECHS"}</Link>
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
        <Link href="/work">{lang === "es" ? "TRABAJO" : "WORK"}</Link>
        <Link href="/techs">{lang === "es" ? "TECNOS" : "TECHS"}</Link>
        <div className={styles.navigator_language_desktop}>
          <div className={styles.navigator_language_desktop_flag}>
            {lang === "es" ? <EnglishFlag /> : <SpanishFlag />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
