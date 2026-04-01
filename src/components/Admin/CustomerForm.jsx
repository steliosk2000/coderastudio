import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { API_BASE_URL } from '../../utils/api';

const CustomerForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    service: '',
    image: '',
    url: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, imageFile: null });
      if (initialData.image) {
        setImagePreview(
          initialData.image.startsWith('/images/') 
            ? `${initialData.image}`
            : API_BASE_URL + `${initialData.image}`
        );
      }
    }
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{initialData ? 'Edit Customer' : 'Add New Customer'}</h2>
        <form onSubmit={handleSubmit} className={styles.adminForm}>
          
          <div className={styles.formGroup}>
            <label>Customer Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Industry / Category</label>
            <input name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Bar & Restaurant" />
          </div>

          <div className={styles.formGroup}>
            <label>Service Provided</label>
            <input name="service" value={formData.service} onChange={handleChange} required placeholder="e.g. Κατασκευή E-Shop" />
          </div>

          <div className={styles.formGroup}>
            <label>Customer Image</label>
            {imagePreview && (
              <div style={{ marginBottom: '10px' }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '4px', objectFit: 'cover' }} />
              </div>
            )}
            <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} required={!initialData?.image} />
          </div>

          <div className={styles.formGroup}>
            <label>Website URL <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85em' }}>(optional)</span></label>
            <input
              name="url"
              value={formData.url || ''}
              onChange={handleChange}
              placeholder="https://example.gr"
              type="url"
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;


