import { useState } from 'react';
import styles from './Admin.module.css';
import { API_BASE_URL } from '../../utils/api';

const CustomerForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    service: initialData?.service || '',
    url: initialData?.url || '',
    image: initialData?.image || '',
    imageFile: null
  });

  const imagePreview = formData.imageFile
    ? URL.createObjectURL(formData.imageFile)
    : (formData.image || initialData?.image
        ? (formData.image || initialData.image)
        : null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      category: formData.category,
      service: formData.service,
      url: formData.url || null,
    };

    if (formData.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        payload.image = reader.result;
        onSave(payload);
      };
      reader.readAsDataURL(formData.imageFile);
    } else {
      payload.image = formData.image || '/images/default-customer.png';
      onSave(payload);
    }
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
            <label>Website URL (optional)</label>
            <input name="url" value={formData.url} onChange={handleChange} placeholder="https://example.com" />
          </div>

          <div className={styles.formGroup}>
            <label>Customer Image</label>
            {imagePreview && (
              <div style={{ marginBottom: '10px' }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '4px', objectFit: 'cover' }} />
              </div>
            )}
            <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
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
