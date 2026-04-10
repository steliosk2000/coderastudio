import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaSearch, FaCameraRetro, FaChartLine, FaPenNib } from 'react-icons/fa';
import QuoteForm from '../components/QuoteForm/QuoteForm';
import styles from './ServiceDetail.module.css';
import { API_BASE_URL } from '../utils/api';
import SEOHead from '../seo/SEOHead';
import ServiceSchema from '../seo/ServiceSchema';
import BreadcrumbSchema from '../seo/BreadcrumbSchema';
const iconMap = {
  FaLaptopCode: <FaLaptopCode size={40} />,
  FaMobileAlt: <FaMobileAlt size={40} />,
  FaSearch: <FaSearch size={40} />,
  FaCameraRetro: <FaCameraRetro size={40} />,
  FaChartLine: <FaChartLine size={40} />,
  FaPenNib: <FaPenNib size={40} />
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASE_URL + `/api/services`)
      .then(res => res.json())
      .then(data => {
         const found = Array.isArray(data) ? data.find(s => s.id.toString() === id) : null;
         setService(found || null);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '150px 20px', textAlign: 'center', fontSize: '1.2rem', color: '#64748b' }}>
        Φόρτωση...
      </div>
    );
  }

  if (!service) {
    return (
      <div className={styles.notFound}>
        <h2>Η υπηρεσία δεν βρέθηκε</h2>
        <Link to="/" className={styles.backBtn}>Επιστροφή στην Αρχική</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Αρχική', url: 'https://coderastudio.gr/' },
    { name: 'Υπηρεσίες', url: 'https://coderastudio.gr/services' },
    { name: service.title, url: `https://coderastudio.gr/services/${service.id}` },
  ];

  return (
    <main className={styles.serviceDetail}>
      <SEOHead
        title={service.title}
        description={`${service.shortDescription} — Επαγγελματική κατασκευή από την Codera Studio για επιχειρήσεις σε όλη την Ελλάδα. Από ${service.pricing}€.`}
        keywords={`${service.title}, ${service.title} αθήνα, ${service.title} θεσσαλονίκη, web design ελλάδα, Codera Studio`}
        canonical={`https://coderastudio.gr/services/${service.id}`}
      />
      <ServiceSchema service={service} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.iconWrapper}>
            {iconMap[service.icon] || <FaLaptopCode size={40} />}
          </div>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.subtitle}>{service.shortDescription}</p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.mainInfo}>
              <h2>Σχετικά με την Υπηρεσία</h2>
              <p>{service.description}</p>
              
              <h3 className={styles.featuresTitle}>Τι περιλαμβάνει;</h3>
              <ul className={styles.featuresList}>
                {Array.isArray(service.features) && service.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.pricingCard}>
              <h3>Κόστος & Επένδυση</h3>
              <div className={styles.price}>Από {service.pricing}€</div>
              <p className={styles.pricingInfo}>
                Το τελικό κόστος εξαρτάται από τις ακριβείς προδιαγραφές του project.
                Επικοινωνήστε μαζί μας για μια δωρεάν κοστολόγηση.
              </p>
              <motion.a 
                href="#quote-form" 
                className={styles.ctaBtn}
                onClick={(e) => { e.preventDefault(); document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >Ζητήστε Προσφορά</motion.a>
            </div>
          </div>
          
          <div id="quote-form" className={styles.quoteSection}>
            <h2 className={styles.quoteTitle}>Ενδιαφέρεστε για {service.title};</h2>
            <p className={styles.quoteSubtitle}>Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε άμεσα μαζί σας για μια εξατομικευμένη προσφορά.</p>
            <QuoteForm serviceName={service.title} />
          </div>
          
          <div className={styles.backLinkWrapper}>
            <Link to="/" className={styles.backBtn}>← Επιστροφή στις Υπηρεσίες</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetail;

