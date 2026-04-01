import { useEffect, useState } from 'react';
import styles from '../../components/Admin/Admin.module.css';
import { API_BASE_URL } from '../../utils/api';
import CustomerForm from '../../components/Admin/CustomerForm';

const CustomersAdmin = () => {
  const [customers, setCustomers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(API_BASE_URL + '/api/customers');
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async (data) => {
    const isEdit = !!data.id;
    const url = isEdit ? `${API_BASE_URL}/api/customers/${data.id}` : API_BASE_URL + '/api/customers';
    const method = isEdit ? 'PUT' : 'POST';

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('service', data.service);
    formData.append('url', data.url || '');
    if (data.imageFile) {
      formData.append('imageFile', data.imageFile);
    } else if (data.image) {
      formData.append('image', data.image);
    }

    await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: formData
    });
    
    setIsFormOpen(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this customer project?')) {
      await fetch(`${API_BASE_URL}/api/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchCustomers();
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Portfolio / Customers</h1>
        <button className={styles.addBtn} onClick={() => { setEditingCustomer(null); setIsFormOpen(true); }}>+ Add Customer Project</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Service Rendered</th>
              <th>Website URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                  <img src={c.image?.startsWith('/uploads/') ? `${API_BASE_URL}${c.image}` : c.image} alt={c.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.service}</td>
                <td>
                  {c.url
                    ? <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem' }}>{c.url}</a>
                    : <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>—</span>
                  }
                </td>
                <td>
                  <button onClick={() => handleEdit(c)} className={`${styles.actionBtn} ${styles.editBtn}`}>Edit</button>
                  <button onClick={() => handleDelete(c.id)} className={styles.actionBtn}>Delete</button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && <tr><td colSpan="7">No customers configured.</td></tr>}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <CustomerForm 
          initialData={editingCustomer} 
          onSave={handleSave} 
          onCancel={() => { setIsFormOpen(false); setEditingCustomer(null); }} 
        />
      )}
    </div>
  );
};

export default CustomersAdmin;


