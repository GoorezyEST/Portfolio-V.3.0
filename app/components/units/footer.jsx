import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "@/styles/modules/footer.module.css";

function Footer() {
  return (
    <section className={styles.contact}>
      <motion.div
        className={styles.contact_title}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        <span>FIND ME THROUGH MY</span>
        <h5>SOCIAL MEDIA</h5>
      </motion.div>
      <div className={styles.contact_list}>
        <motion.div
          className={styles.contact_list_item}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{
          delay: 0.125,
          duration: 0.275,
          ease: "easeInOut",
        }}
      >
        Designed and developed by Franco Espinosa, 2023.
      </motion.p>
    </section>
  );
}

export default Footer;
