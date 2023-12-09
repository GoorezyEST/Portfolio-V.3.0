import React, { useEffect, useState, useRef } from "react";
import LogoIcon from "../icons/LogoIcon";
import Link from "next/link";
import styles from "@/styles/modules/navbar.module.css";
import { motion } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";

function Navbar() {
  const { lang } = useGlobal();

  return (
    <nav className={styles.navigator}>
      <div className={styles.navigator_logo}>
        <LogoIcon />
      </div>
      <div className={styles.navigator_links}>
        <Link href="/">{lang === "es" ? "INICIO" : "HOME"}</Link>
        <Link href="/work">{lang === "es" ? "TRABAJO" : "WORK"}</Link>
        <Link href="/techs">{lang === "es" ? "TECNOS" : "TECHS"}</Link>
      </div>
    </nav>
  );
}

export default Navbar;
