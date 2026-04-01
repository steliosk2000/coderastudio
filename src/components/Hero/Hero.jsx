import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 } // Snappy modern spring
  }
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className={styles.badge}>Νέα εποχή στο Web Design</motion.div>
          <motion.h1 variants={itemVariants} className={styles.heading}>
            Αναβάθμιση της <span>Επιχείρησης</span> σας στον Ψηφιακό Κόσμο
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.description}>
            Εξειδικευμένες λύσεις κατασκευής ιστοσελίδων, e-shop και δημιουργικού σχεδιασμού.
            Ελάτε να χτίσουμε μαζί την ψηφιακή σας ταυτότητα από το μηδέν, με σύγχρονο design και άριστη λειτουργικότητα.
          </motion.p>
          <motion.div variants={itemVariants} className={styles.actions}>
            <motion.a
              href="/services"
              className={styles.primaryBtn}
              onClick={(e) => { e.preventDefault(); navigate('/services'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Οι Υπηρεσίες μας
            </motion.a>
            <motion.a
              href="#contact"
              className={styles.secondaryBtn}
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Άμεση Επικοινωνία
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient orb */}
      <motion.div
        className={styles.glowOrb}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -30, 0]
        }}
        transition={{
          opacity: { duration: 1.5, delay: 0.5 },
          scale: { duration: 1.5, delay: 0.5 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
    </section>
  );
};

export default Hero;

