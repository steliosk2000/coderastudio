import { useEffect, useState } from 'react';
import styles from '../../components/Admin/Admin.module.css';
import { API_BASE_URL } from '../../utils/api';
import ServiceForm from '../../components/Admin/ServiceForm';

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = () => {
    return fetch(API_BASE_URL + '/api/services')
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    // Fetching data on mount is intentional for this admin view.
     
    fetchServices();
  }, []);

  const handleSave = async (data) => {
    const isEdit = !!data.id;
    const url = isEdit ? `${API_BASE_URL}/api/services/${data.id}` : API_BASE_URL + '/api/services';
    const method = isEdit ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(data)
    });
    
    setIsFormOpen(false);
    setEditingService(null);
    fetchServices();
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this service?')) {
      await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchServices();
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Services Management</h1>
        <button className={styles.addBtn} onClick={() => { setEditingService(null); setIsFormOpen(true); }}>+ Add Service</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Icon</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.icon}</td>
                <td>{s.title}</td>
                <td>Από {s.pricing}€</td>
                <td>
                  <button onClick={() => handleEdit(s)} className={`${styles.actionBtn} ${styles.editBtn}`}>Edit</button>
                  <button onClick={() => handleDelete(s.id)} className={styles.actionBtn}>Delete</button>
                </td>
              </tr>
            ))}
            {services.length === 0 && <tr><td colSpan="5">No services configured.</td></tr>}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <ServiceForm 
          initialData={editingService} 
          onSave={handleSave} 
          onCancel={() => { setIsFormOpen(false); setEditingService(null); }} 
        />
      )}
    </div>
  );
};

export default ServicesAdmin;


