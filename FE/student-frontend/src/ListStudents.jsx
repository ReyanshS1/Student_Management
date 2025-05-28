import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base API URL (easier to maintain)
  const API_URL = 'https://localhost:7288/api/Students';

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(API_URL);
        setStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError('Could not load students. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete student:', err);
      alert('Error deleting student. Please try again.');
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              Name: {s.name} -- Age: {s.age} -- Class: {s.class}
              <button onClick={() => deleteStudent(s.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
