import { useState } from 'react';
import styles from './ContactForm.module.css';
import { API_BASE_URL } from '../../utils/api';

const ContactForm = ({ subjectPlaceholder = "Πώς μπορούμε να βοηθήσουμε;" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
        body: JSON.stringify({ ...formData, serviceName: 'General Contact' })
      });
      
      if (res.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
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
          Το μήνυμά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα μαζί σας.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Ονοματεπώνυμο</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="π.χ. Γιάννης Παπαδόπουλος"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Επικοινωνίας</label>
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
            <label htmlFor="phone">Τηλέφωνο Επικοινωνίας</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="π.χ. 6900000000 (Προαιρετικό)"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="message">Μήνυμα</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
              rows={4}
              placeholder={subjectPlaceholder}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Αποστολή...' : 'Αποστολή Μηνύματος'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;


