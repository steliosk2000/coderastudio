import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Υποσέλιδο ιστοσελίδας">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-label="Codera Studio — Κατασκευή Ιστοσελίδων">
              <span className={styles.highlight}>Codera</span>Studio
            </div>
            <p className={styles.description}>
              Η αξιόπιστη λύση για την ψηφιακή σας παρουσία.
              Σχεδιάζουμε το αύριο, σήμερα.
            </p>
          </div>

          <nav aria-label="Γρήγοροι σύνδεσμοι" className={styles.links}>
            <h4 className={styles.title}>Γρήγοροι Σύνδεσμοι</h4>
            <ul>
              <li><Link to="/">Αρχική</Link></li>
              <li><Link to="/services">Υπηρεσίες</Link></li>
              <li><Link to="/customers">Πελάτες</Link></li>
              <li><a href="/#about">Σχετικά με εμάς</a></li>
              <li><a href="/#contact">Επικοινωνία</a></li>
            </ul>
          </nav>

          <address className={styles.contact} aria-label="Στοιχεία επικοινωνίας">
            <h4 className={styles.title}>Επικοινωνία</h4>
            <p>
              <a href="mailto:info@coderastudio.gr" aria-label="Στείλτε email στην Codera Studio">
                Email: info@coderastudio.gr
              </a>
            </p>
            <p>
              <a href="tel:+306971826704" aria-label="Καλέστε την Codera Studio">
                Τηλέφωνο: +30 697 182 6704
              </a>
            </p>
            <p>Χανιά, Κρήτη, Ελλάδα</p>
          </address>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} Codera Studio — Κατασκευή Ιστοσελίδων. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


