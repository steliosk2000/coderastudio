import { motion } from 'framer-motion';
import styles from './Customers.module.css';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
};

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + '/api/customers')
      .then(res => res.json())
      .then(data => setCustomersData(Array.isArray(data) ? data : []));
  }, []);

  return (
    <section className={styles.customersSection} id="portfolio">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>Portfolio</div>
          <h2 className={styles.title}>Οι Πελάτες Μας</h2>
          <p className={styles.subtitle}>
            Δείτε μερικά από τα πρόσφατα project μας και πώς βοηθήσαμε επιχειρήσεις
            να αναβαθμίσουν την ψηφιακή τους παρουσία.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          style={{ perspective: 1000 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {customersData.map((customer) => {
            const href = customer.url
              ? customer.url.startsWith('http') ? customer.url : `https://${customer.url}`
              : null;

            const cardInner = (
              <>
                <div className={styles.imageWrapper}>
                  <img src={customer.image?.startsWith('/uploads/') ? `${API_BASE_URL}${customer.image}` : customer.image} alt={customer.name} className={styles.image} />
                  <div className={styles.overlay}>
                    <span className={styles.serviceTag}>{customer.service}</span>
                    {href && (
                      <span className={styles.visitBadge}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Προβολή Ιστοσελίδας
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{customer.category}</span>
                  <h3 className={styles.name}>{customer.name}</h3>
                </div>
              </>
            );

            return (
              <motion.div
                variants={cardVariants}
                key={customer.id}
                className={styles.card}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                    aria-label={`Επισκεφθείτε την ιστοσελίδα του ${customer.name}`}
                  >
                    {cardInner}
                  </a>
                ) : (
                  cardInner
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Customers;


