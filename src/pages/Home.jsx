import { motion } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from './Home.module.css';
import SEOHead from '../seo/SEOHead';
import LocalBusinessSchema from '../seo/LocalBusinessSchema';
import WebSiteSchema from '../seo/WebSiteSchema';


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -100, rotateY: -15 },
  visible: {
    opacity: 1, x: 0, rotateY: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const slideRight = {
  hidden: { opacity: 0, x: 100, rotateY: 15 },
  visible: {
    opacity: 1, x: 0, rotateY: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const popUp = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15 }
  }
};

const Home = () => {
  return (
    <motion.main
      className={styles.mainContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEOHead
        title="Κατασκευή Ιστοσελίδων & E-Shop"
        description="Εξειδικευμένη κατασκευή ιστοσελίδων, e-shop και ψηφιακού QR μενού. Αναλαμβάνουμε επιχειρήσεις, εστιατόρια και ξενοδοχεία σε όλη την Ελλάδα."
        keywords="κατασκευή ιστοσελίδων, κατασκευή eshop, κατασκευή ιστοσελίδων αθήνα, κατασκευή ιστοσελίδων θεσσαλονίκη, ιστοσελίδα ξενοδοχείου, web design ελλάδα, qr menu"
        canonical="https://coderastudio.gr/"
      />
      <LocalBusinessSchema />
      <WebSiteSchema />

      <Hero />


      <section className={styles.benefitsSection} style={{ overflow: 'hidden' }}>
        <motion.div
          className={styles.container}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          <motion.div variants={slideLeft} className={styles.benefitsHeader}>
            <h2 className={styles.sectionTitle}>Γιατί να Επιλέξετε Εμάς;</h2>
            <p className={styles.sectionText}>Δημιουργούμε ψηφιακές εμπειρίες που ξεχωρίζουν, εστιάζοντας στην ποιότητα, την ταχύτητα και το μετρήσιμο αποτέλεσμα.</p>
          </motion.div>
          <div className={styles.benefitsGrid}>
            <motion.div variants={slideLeft} className={styles.benefitCard}>
              <h3>Αστραπιαία Ταχύτητα</h3>
              <p>Κατασκευάζουμε ιστοσελίδες με σύγχρονες τεχνολογίες που φορτώνουν σε κλάσματα δευτερολέπτου, προσφέροντας την καλύτερη εμπειρία χρήστη.</p>
            </motion.div>
            <motion.div variants={popUp} className={styles.benefitCard}>
              <h3>Custom & Unique Design</h3>
              <p>Ξεχάστε τα έτοιμα και βαρετά templates. Σχεδιάζουμε από το μηδέν βασισμένοι στο δικό σας brand identity.</p>
            </motion.div>
            <motion.div variants={slideRight} className={styles.benefitCard}>
              <h3>24/7 Τεχνική Υποστήριξη</h3>
              <p>Είμαστε δίπλα σας ακόμα και μετά την παράδοση του έργου, διασφαλίζοντας την ομαλή λειτουργία της επιχείρησής σας.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className={styles.processSection} style={{ overflow: 'hidden' }}>
        <div className={styles.container}>
          <motion.div
            className={styles.processHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={popUp}
          >
            <h2 className={styles.sectionTitle}>Πώς Δουλεύουμε</h2>
            <p className={styles.sectionText}>Μια απλή και δομημένη διαδικασία από την πρώτη επαφή μέχρι το τελικό λανσάρισμα.</p>
          </motion.div>

          <motion.div
            className={styles.processSteps}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <motion.div variants={slideLeft} className={styles.processStep}>
              <motion.div className={styles.stepNumber} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>1</motion.div>
              <div>
                <h3>Ανάλυση & Στρατηγική</h3>
                <p>Καταγράφουμε τις ανάγκες σας, μελετάμε τον ανταγωνισμό και σχεδιάζουμε το κατάλληλο πλάνο για το έργο.</p>
              </div>
            </motion.div>
            <motion.div variants={slideRight} className={styles.processStep}>
              <motion.div className={styles.stepNumber} whileHover={{ rotate: -360 }} transition={{ duration: 0.6 }}>2</motion.div>
              <div>
                <h3>Σχεδιασμός & Ανάπτυξη</h3>
                <p>Μετατρέπουμε το πλάνο σε πραγματικότητα. Δημιουργούμε το design και υλοποιούμε τον κώδικα με τα υψηλότερα πρότυπα.</p>
              </div>
            </motion.div>
            <motion.div variants={slideLeft} className={styles.processStep}>
              <motion.div className={styles.stepNumber} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>3</motion.div>
              <div>
                <h3>Testing & Παράδοση</h3>
                <p>Διενεργούμε αυστηρούς ελέγχους ποιότητας, βελτιστοποιούμε για SEO και παραδίδουμε το έργο με το "κλειδί στο χέρι".</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className={styles.aboutSection} style={{ overflow: 'hidden' }}>
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={popUp}
        >
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>Σχετικά με Εμάς</h2>
            <p className={styles.sectionText}>
              Είμαστε μια ομάδα που δραστηριοποιείται στον χώρο του Web Design. Με έδρα τα Χανιά, αναλαμβάνουμε έργα πανελλαδικά και δημιουργούμε
              σύγχρονες, καλοσχεδιασμένες ιστοσελίδες που δεν εντυπωσιάζουν απλώς — αποδίδουν.
              Στόχος μας είναι να βοηθάμε επιχειρήσεις να ξεχωρίζουν, να εξελίσσονται και να μετατρέπουν την online
              παρουσία τους σε πραγματικό εργαλείο ανάπτυξης. Συνδυάζουμε αισθητική, στρατηγική και τεχνολογία
              για να δημιουργούμε εμπειρίες που τραβούν την προσοχή και κρατούν το ενδιαφέρον.
              Κάθε project για εμάς είναι μια ευκαιρία να δημιουργήσουμε κάτι ουσιαστικό. Δίνουμε έμφαση στη
              λεπτομέρεια, κατανοούμε τις ανάγκες του κάθε brand και σχεδιάζουμε λύσεις που κάνουν τη διαφορά —
              όχι μόνο στο design, αλλά και στα αποτελέσματα.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="contact" className={styles.contactSection} style={{ overflow: 'hidden' }}>
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={popUp}
        >
          <div className={styles.contactHeader}>
            <h2 className={styles.sectionTitle}>Επικοινωνήστε Μαζί Μας</h2>
            <p className={styles.sectionText}>
              Συμπληρώστε τη φόρμα και θα χαρούμε να συζητήσουμε τις ανάγκες του project σας.
            </p>
          </div>
          <ContactForm />
        </motion.div>
      </section>
    </motion.main>
  );
};

export default Home;

