"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CreateCustomer() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [interests, setInterests] = useState('');
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch('/api/customer');
    const data = await response.json();
    setCustomers(data.customers);

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingCustomer ? 'PUT' : 'POST';
    const url = '/api/customer';
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingCustomer?._id,
        name,
        dateOfBirth,
        memberNumber: parseInt(memberNumber),
        interests,
      }),
    });

    const result = await response.json();
    fetchCustomers();
    clearForm();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      const response = await fetch('/api/customer', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      fetchCustomers();
    }
  };

  const handleEdit = (customer) => {
    setName(customer.name);
    setDateOfBirth(customer.dateOfBirth.split('T')[0]);
    setMemberNumber(customer.memberNumber);
    setInterests(customer.interests);
    setEditingCustomer(customer); 
  };

  const clearForm = () => {
    setName('');
    setDateOfBirth('');
    setMemberNumber('');
    setInterests('');
    setEditingCustomer(null);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{editingCustomer ? 'Edit Customer' : 'Create Customer'}</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="date" 
          value={dateOfBirth} 
          onChange={(e) => setDateOfBirth(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="number" 
          placeholder="Member Number" 
          value={memberNumber} 
          onChange={(e) => setMemberNumber(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Interests (comma-separated)" 
          value={interests} 
          onChange={(e) => setInterests(e.target.value)} 
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            {editingCustomer ? 'Update Customer' : 'Create Customer'}
          </button>
          {editingCustomer && (
            <button type="button" style={styles.button} onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={styles.customerList}>
        <h2>Customer List</h2>
        <ul style={styles.list}>
          {customers.map((customer) => (
            <li key={customer._id} style={styles.listItem}>
              <Link key={customer._id} href={`/api/customer/${customer._id}`}>
                <div style={styles.customerInfo}>
                  <span>{customer.name} - {customer.memberNumber}</span>
                </div>
              </Link>
              <div style={styles.actionButtons}>
                <button onClick={() => handleEdit(customer)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(customer._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#ccc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  customerList: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    fontSize: '18px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
