import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "@/styles/modules/footer.module.css";
import { useGlobal } from "@/contexts/GlobalContext";

function Footer() {
  const { lang } = useGlobal();

  return (
    <section className={styles.contact}>
      <motion.div
        className={styles.contact_title}
        initial={{ opacity: 0, x: "16px" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        <span>
          {lang === "es" ? "ENCUENTRAME A TRAVÉS DE" : "FIND ME THROUGH MY"}
        </span>
        <h5>{lang === "es" ? "MIS REDES SOCIALES" : "SOCIAL MEDIA"}</h5>
      </motion.div>
      <div className={styles.contact_list}>
        <motion.div
          className={styles.contact_list_item}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <span>LinkedIn:&nbsp;</span>
          <Link
            href="https://www.linkedin.com/in/franco-espinosa/"
            target="_blank"
          >
            www.linkedin.com/in/franco-espinosa/
          </Link>
        </motion.div>
        <motion.div
          className={styles.contact_list_item}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <span>GitHub:&nbsp;</span>
          <Link href="https://github.com/GoorezyEST" target="_blank">
            github.com/GoorezyEST
          </Link>
        </motion.div>
        <motion.div
          className={styles.contact_list_item}
          initial={{ opacity: 0, x: "16px" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.125,
            duration: 0.275,
            ease: "easeInOut",
          }}
        >
          <span>Gmail:&nbsp;</span>
          <Link href="mailto:francoespinosa.dev@gmail.com" target="_blank">
            francoespinosa.dev@gmail.com
          </Link>
        </motion.div>
      </div>
      <motion.p
        className={styles.contact_mention}
        initial={{ opacity: 0, x: "16px" }}
        whileInView={{ opacity: 0.5, x: 0 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        {lang === "es"
          ? "Diseñado y desarrollado por Franco Espinosa, 2023."
          : "Designed and developed by Franco Espinosa, 2023."}
      </motion.p>
    </section>
  );
}

export default Footer;
