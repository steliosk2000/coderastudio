import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.highlight}>Codera</span>Studio
            </div>
            <p className={styles.description}>
              Η αξιόπιστη λύση για την ψηφιακή σας παρουσία.
              Σχεδιάζουμε το αύριο, σήμερα.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.title}>Γρήγοροι Σύνδεσμοι</h4>
            <ul>
              <li><a href="#home">Αρχική</a></li>
              <li><a href="#services">Υπηρεσίες</a></li>
              <li><a href="#about">Σχετικά με εμάς</a></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.title}>Επικοινωνία</h4>
            <p>Email: info@coderastudio.gr</p>
            <p>Τηλέφωνο: +30 694 709 2030</p>
            <p>Χανιά, Ελλάδα</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} CoderaStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

