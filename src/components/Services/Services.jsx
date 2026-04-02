import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaLaptopCode, FaMobileAlt, FaSearch, FaCameraRetro, FaChartLine, FaPenNib } from 'react-icons/fa';
import styles from './Services.module.css';
import { API_BASE_URL } from '../../utils/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const iconMap = {
  FaLaptopCode: <FaLaptopCode size={40} />,
  FaMobileAlt: <FaMobileAlt size={40} />,
  FaSearch: <FaSearch size={40} />,
  FaCameraRetro: <FaCameraRetro size={40} />,
  FaChartLine: <FaChartLine size={40} />,
  FaPenNib: <FaPenNib size={40} />
};

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + '/api/services')
      .then(res => res.json())
      .then(data => setServicesData(Array.isArray(data) ? data : []));
  }, []);

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Οι Υπηρεσίες Μας</h2>
          <p className={styles.subtitle}>
            Προσφέρουμε ολοκληρωμένες ψηφιακλες λύσεις που καλύπτουν κάθε ανάγκη της επιχείρησής σας.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          style={{ perspective: 1000 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {servicesData.map((service) => (
            <motion.div variants={cardVariants} key={service.id}>
              <Link to={`/services/${service.id}`} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {iconMap[service.icon] || <FaLaptopCode size={40} />}
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.shortDescription}</p>
                <div className={styles.readMore}>Μάθετε Περισσότερα &rarr;</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;


