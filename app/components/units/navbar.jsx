import React, { useEffect, useState, useRef } from "react";
import LogoIcon from "../icons/LogoIcon";
import Link from "next/link";
import styles from "@/styles/modules/navbar.module.css";
import { motion } from "framer-motion";

function Navbar() {
  const [shrinkNav, setShrinkNav] = useState(true);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      // Verificar si el scroll está en el inicio
      const isScrollAtTop = currentScrollPosition === 0;

      // Actualizar el estado de ShrinkNav
      setShrinkNav(isScrollAtTop);

      lastScrollPosition.current = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={styles.navigator}
      style={{ backgroundColor: shrinkNav ? "" : "var(--black-light)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.125,
        duration: 0.275,
        ease: "easeInOut",
      }}
    >
      <div className={styles.navigator_logo}>
        <LogoIcon />
      </div>
      <div className={styles.navigator_links}>
        <Link href="/">HOME</Link>
        <Link href="/work">WORK</Link>
        <Link href="#">TECHS</Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;
