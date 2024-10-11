// app/customer/[id]/page.js
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // Next.js 13 uses this hook for fetching params

export default function CustomerDetailPage() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the `useParams` hook to get the customer ID from the URL
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id);
    }
  }, [id]);

  const fetchCustomerDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/customer/${id}`);
      if (!response.ok) throw new Error('Failed to fetch customer details');
      const data = await response.json();
      setCustomer(data.customer);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Member Number:</strong> {customer.memberNumber}</p>
      <p><strong>Interests:</strong> {customer.interests}</p>
    </div>
  );
}
