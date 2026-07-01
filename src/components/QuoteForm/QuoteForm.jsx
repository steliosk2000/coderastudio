import { useState } from 'react';
import styles from './QuoteForm.module.css';
import { API_BASE_URL } from '../../utils/api';

const QuoteForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(API_BASE_URL + '/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, domain: formData.company, serviceName })
      });
      
      if (res.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', budget: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setIsSubmitting(false);
        alert('Παρουσιάστηκε σφάλμα κατα την υποβολή.');
      }
    } catch {
      setIsSubmitting(false);
      alert('Αδυναμία σύνδεσης στον διακομιστή.');
    }
  };

  return (
    <div className={styles.formContainer}>
      {isSuccess ? (
        <div className={styles.successMessage}>
          Το αίτημά σας για προσφορά εστάλη επιτυχώς! Ένας εκπρόσωπός μας θα σας καλέσει σύντομα.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Ονοματεπώνυμο *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="π.χ. Γιάννης Παππάς"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="company">Εταιρεία / Brand</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleChange}
                placeholder="π.χ. MyApp Ltd"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="name@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Τηλέφωνο Επικοινωνίας *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="π.χ. 6900000000"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="budget">Εκτιμώμενος Προϋπολογισμός</label>
            <select 
              id="budget" 
              name="budget" 
              value={formData.budget} 
              onChange={handleChange}
            >
              <option value="">Επιλέξτε ένα εύρος...</option>
              <option value="up-to-500">Έως 500€</option>
              <option value="500-1500">500€ - 1.500€</option>
              <option value="1500-3000">1.500€ - 3.000€</option>
              <option value="3000-plus">Άνω των 3.000€</option>
              <option value="not-sure">Δεν είμαι σίγουρος/η</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Περιγράψτε μας το project σας *</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
              rows={5}
              placeholder={`Αναφέρετε λίγα λόγια για τις απαιτήσεις σχετικά με: ${serviceName}`}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Αποστολή...' : 'Λήψη Προσφοράς'}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuoteForm;


