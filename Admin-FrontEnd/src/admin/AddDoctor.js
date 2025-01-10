import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoctor, getSpecialists } from '../api/Service';
import mediallogo from '../image/medical-symbol.png';
import dashlogo from '../image/dashboard.png';

export default function AddDoctor() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    fullName: '',
    dateOfBirth: '',
    qualification: '',
    specialist: '',
    email: '',
    phone: '',
    password: '',
  });
  const [specialists, setSpecialists] = useState([]);

  // Fetch specialists list
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const result = await getSpecialists();
        const cleanedSpecialists = result.data.map(specialist => {
          let specialistName = specialist.name;
          try {
            const parsedName = JSON.parse(specialistName);
            specialistName = parsedName.name;
          } catch (error) {
            console.error("Error parsing name:", error);
          }
          return {
            ...specialist,
            name: specialistName,
          };
        });
        setSpecialists(cleanedSpecialists);
      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    };

    fetchSpecialists();
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addDoctor({
      ...doctor,
      specialist: doctor.specialist,
    });
    if (result.status === 200) {
      alert('Doctor added successfully');
      setDoctor({
        fullName: '',
        dateOfBirth: '',
        qualification: '',
        specialist: '',
        email: '',
        phone: '',
        password: '',
      });
      navigate('/admindashboard');
    }
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
      <div
        className="container p-4 border"
        style={{
          maxWidth: '600px',
          minHeight: '400px',
          borderRadius: '0', // Remove rounded corners for a rectangular shape
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="my-4 text-center">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={doctor.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={doctor.dateOfBirth}
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
              value={doctor.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Specialist</label>
            <select
              className="form-select"
              name="specialist"
              value={doctor.specialist}
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
              value={doctor.email}
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
              value={doctor.phone}
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
              value={doctor.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
