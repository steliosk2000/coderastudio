import { useEffect, useState } from 'react';
import styles from '../../components/Admin/Admin.module.css';
import { API_BASE_URL } from '../../utils/api';
import SubmissionModal from '../../components/Admin/SubmissionModal';

const SubmissionsAdmin = () => {
  const [subs, setSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);

  const fetchSubs = () => {
    return fetch(API_BASE_URL + '/api/submissions', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => setSubs(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Fetching data on mount is intentional for this admin view.
     
    fetchSubs();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/api/submissions/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
      },
      body: JSON.stringify({ status })
    });
    setSelectedSub(prev => prev && prev.id === id ? { ...prev, status } : prev);
    fetchSubs();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this submission completely?')) {
      await fetch(`${API_BASE_URL}/api/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setSelectedSub(null);
      fetchSubs();
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Form Submissions</h1>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Name</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subs.map(sub => (
              <tr key={sub.id}>
                <td>
                  <span style={{ 
                    background: sub.status === 'RESOLVED' ? '#dcfce7' : '#fef9c3', 
                    color: sub.status === 'RESOLVED' ? '#166534' : '#854d0e',
                    padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                  }}>
                    {sub.status || 'PENDING'}
                  </span>
                </td>
                <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                <td>{sub.name}</td>
                <td>{sub.serviceName}</td>
                <td>
                  <button onClick={() => setSelectedSub(sub)} className={`${styles.actionBtn} ${styles.editBtn}`}>View Details</button>
                </td>
              </tr>
            ))}
            {subs.length === 0 && <tr><td colSpan="5">No submissions yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <SubmissionModal 
        submission={selectedSub}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
        onClose={() => setSelectedSub(null)}
      />
    </div>
  );
};

export default SubmissionsAdmin;


