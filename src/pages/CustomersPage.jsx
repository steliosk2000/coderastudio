import { motion } from 'framer-motion';
import Customers from '../components/Customers/Customers';
import SEOHead from '../seo/SEOHead';
import BreadcrumbSchema from '../seo/BreadcrumbSchema';

const BREADCRUMBS = [
  { name: 'Αρχική', url: 'https://coderastudio.gr/' },
  { name: 'Πελάτες', url: 'https://coderastudio.gr/customers' },
];

const CustomersPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--background)' }}
    >
      <SEOHead
        title="Πελάτες & Portfolio — Έργα Web Design"
        description="Δείτε τα ολοκληρωμένα έργα μας — κατασκευή ιστοσελίδων, e-shop και ψηφιακών μενού για επιχειρήσεις σε όλη την Ελλάδα. Ανακαλύψτε πώς βοηθάμε επιχειρήσεις να αναπτυχθούν ψηφιακά."
        keywords="portfolio web design, έργα κατασκευή ιστοσελίδων ελλάδα, πελάτες Codera Studio, eshop αθήνα, ιστοσελίδες ξενοδοχείων θεσσαλονίκη, κατασκευή ιστοσελίδων"
        canonical="https://coderastudio.gr/customers"
      />
      <BreadcrumbSchema items={BREADCRUMBS} />
      <Customers />
    </motion.main>
  );
};

export default CustomersPage;


