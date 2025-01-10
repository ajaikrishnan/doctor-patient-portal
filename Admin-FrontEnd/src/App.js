import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './admin/Login';
import Dashboard from './admin/AdminDashboard';
import ViewDoctors from './admin/ListDoctor';
import AddDoctor from './admin/AddDoctor';
import AddSpecialist from './admin/AddSpecialist';
import ProtectedRoute from './admin/ProtectedRoute';
import AppointmentList from './admin/Appointments';
import LogoutButton from './admin/Logout';
import ViewUsers from './admin/ViewUsers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutButton />} />
          {/* Protected Routes */}
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-doctor"
            element={
              <ProtectedRoute>
                <AddDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view_users"
            element={
              <ProtectedRoute>
                <ViewUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-specialist"
            element={
              <ProtectedRoute>
                <AddSpecialist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-doctor-list"
            element={
              <ProtectedRoute>
                <ViewDoctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-appointment"
            element={
              <ProtectedRoute>
                <AppointmentList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


















// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './admin/Login';
// import Dashboard from './admin/AdminDashboard';
// import ViewDoctors from './admin/ListDoctor';
// import AddDoctor from './admin/AddDoctor';
// import AddSpecialist from './admin/AddSpecialist';


// function App() {
//   return (
//     <div className="App">
//       <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/admindashboard" element={<Dashboard />} />
//         <Route path="/add-doctor" element={<AddDoctor/>} />
//         <Route path="/add-specialist" element={<AddSpecialist/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/view-doctor-list" element={<ViewDoctors/>} />
//       </Routes>
//     </Router>
//     </div>
//   );
// }

// export default App;
