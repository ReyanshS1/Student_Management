import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListStudents from './ListStudents';
import AddStudent from './AddStudent';
function App() {
 return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<ListStudents />} />
 <Route path="/add" element={<AddStudent />} />
 </Routes>
 </BrowserRouter>
 );
}
export default App;