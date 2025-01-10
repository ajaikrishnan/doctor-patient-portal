import React, { useEffect, useState } from 'react';
import { getAllDoctors, deleteDoctor, updateDoctor, getSpecialists } from '../api/Service'; // Import the API method for fetching specialists
import mediallogo from '../image/medical-symbol.png';
import dashlogo from '../image/dashboard.png';

export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialists, setSpecialists] = useState([]); // State for specialists
  const [doctorToEdit, setDoctorToEdit] = useState(null);

  // Fetch doctors and specialists on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      const result = await getAllDoctors();
      setDoctors(result.data);
    };
    const fetchSpecialists = async () => {
      const result = await getSpecialists(); // Fetch specialists list
      setSpecialists(result.data);
    };

    fetchDoctors();
    fetchSpecialists();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteDoctor(id);
    if (result.status === 200) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    }
  };

  const handleEdit = (doctor) => {
    setDoctorToEdit(doctor);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateDoctor(doctorToEdit);
    if (result.status === 200) {
      alert('Doctor updated successfully');
      setDoctors(
        doctors.map((doc) =>
          doc.id === doctorToEdit.id ? doctorToEdit : doc
        )
      );
      setDoctorToEdit(null);
    }
  };

  const handleChange = (e) => {
    setDoctorToEdit({ ...doctorToEdit, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={dashlogo} alt="Logo" width="50" height="50" />
            <div className="d-inline-block px-3">
              <h3 className="m-0">Dashboard</h3>
            </div>
          </a>
          <div className="d-flex align-items-center px-3">
            <img src={mediallogo} alt="Logo" width="50" height="50" />
            <h6 className="ms-auto">LifeSpring Medical Center</h6>
          </div>
        </div>
      </nav>
      <div className="container">
        <h2 className="my-4 text-center">All Doctors</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Qualification</th>
              <th>Specialist</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.fullName}</td>
                <td>{doctor.dateOfBirth}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.specialist}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {doctorToEdit && (
          <div className="modal show" style={{ display: 'block' }} onClick={() => setDoctorToEdit(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Doctor</h5>
                  <button type="button" className="btn-close" onClick={() => setDoctorToEdit(null)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={doctorToEdit.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={doctorToEdit.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Qualification</label>
                      <input
                        type="text"
                        className="form-control"
                        name="qualification"
                        value={doctorToEdit.qualification}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Specialist</label>
                      <select
                        className="form-control"
                        name="specialist"
                        value={doctorToEdit.specialist}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Specialist</option>
                        {specialists.map((specialist) => (
                          <option key={specialist.id} value={specialist.name}>
                            {specialist.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={doctorToEdit.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={doctorToEdit.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={doctorToEdit.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Doctor
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
