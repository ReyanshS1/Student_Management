// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function ListStudents() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Base API URL (easier to maintain)
//   const API_URL = 'https://localhost:7288/api/Students';

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setStudents(res.data);
//       } catch (err) {
//         console.error('Failed to fetch students:', err);
//         setError('Could not load students. Please check if the backend is running.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setStudents((prev) => prev.filter((s) => s.id !== id));
//     } catch (err) {
//       console.error('Failed to delete student:', err);
//       alert('Error deleting student. Please try again.');
//     }
//   };

//   if (loading) return <p>Loading students...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h2>All Students</h2>
//       {students.length === 0 ? (
//         <p>No students found.</p>
//       ) : (
//         <ul>
//           {students.map((s) => (
//             <li key={s.id}>
//               Name: {s.name} -- Age: {s.age} -- Class: {s.class}
//               <button onClick={() => deleteStudent(s.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState('');
//   const [age, setAge] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = 'https://localhost:7288/api/Students';

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(API_URL, {
//         params: { search, age }
//       });
//       setStudents(response.data);
//     } catch (err) {
//       console.error('Failed to fetch students:', err);
//       setError('Could not load students. Please check if the backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [search, age]);

//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setStudents((prev) => prev.filter((s) => s.id !== id));
//     } catch (err) {
//       console.error('Failed to delete student:', err);
//       alert('Error deleting student. Please try again.');
//     }
//   };

//   if (loading) return <p>Loading students...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h2>Student List</h2>

//       <input
//         type="text"
//         placeholder="Search by name"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <select value={age} onChange={(e) => setAge(e.target.value)}>
//         <option value="">All Ages</option>
//         <option value="10">10</option>
//         <option value="11">11</option>
//         <option value="12">12</option>
//       </select>

//       {students.length === 0 ? (
//         <p>No students found.</p>
//       ) : (
//         <ul>
//           {students.map((student) => (
//             <li key={student.id}>
//               Name: {student.name} — Age: {student.age} — Class: {student.class}
//               <button onClick={() => deleteStudent(student.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy, setSortBy] = useState('Name');
  const [isAsc, setIsAsc] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const API_URL = 'https://localhost:7288/api/Students';

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: { search, age, page, pageSize, sortBy, isAsc }
      });
      setStudents(response.data.data || response.data); // handle if response structure differs
      const totalCount = response.data.totalCount || response.data.length || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError('Could not load students. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, age, page, pageSize, sortBy, isAsc]);

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
      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Ages</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Name">Name</option>
        <option value="Age">Age</option>
        <option value="Date">Date</option>
      </select>

      <button onClick={() => setIsAsc(!isAsc)}>
        {isAsc ? 'Ascending' : 'Descending'}
      </button>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              Name: {student.name} — Age: {student.age} — Class: {student.class}
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
}

