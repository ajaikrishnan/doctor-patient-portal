import React, { useState, useEffect } from 'react';
import { addSpecialist, getSpecialists, deleteSpecialist } from '../api/Service';
import mediallogo from '../image/medical-symbol.png';
import dashlogo from '../image/dashboard.png';

export default function AddSpecialist() {
  const [specialist, setSpecialist] = useState('');
  const [specialists, setSpecialists] = useState([]);

  // Fetch specialists list when the component mounts
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const result = await getSpecialists();
        
        const cleanedSpecialists = result.data.map(specialist => {
          let specialistName = specialist.name;

          // Parse the name if it is stringified JSON
          try {
            const parsedName = JSON.parse(specialistName);
            specialistName = parsedName.name; // Get the name from JSON
          } catch (error) {
            console.error("Error parsing name:", error);
          }

          return {
            ...specialist,
            name: specialistName,
          };
        });

        setSpecialists(cleanedSpecialists); // Set the cleaned list of specialists
      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    };

    fetchSpecialists();
  }, []); // This will run only once, when the component mounts

  // Handle change in the specialist input field
  const handleChange = (e) => {
    setSpecialist(e.target.value);
  };

  // Handle form submission to add a new specialist
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the specialist name as a string (not JSON)
    const result = await addSpecialist(specialist);

    if (result.status === 200) {
      alert('Specialist added successfully');
      setSpecialist('');
      // Refresh the list of specialists after adding
      const updatedSpecialists = await getSpecialists();
      setSpecialists(updatedSpecialists.data);
    }
  };

  // Handle delete action for a specialist
  const handleDelete = async (id) => {
    try {
      await deleteSpecialist(id);
      alert('Specialist deleted successfully');
      // Refresh the list of specialists after deletion
      const updatedSpecialists = await getSpecialists();
      setSpecialists(updatedSpecialists.data);
    } catch (error) {
      console.error('Error deleting specialist:', error);
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

      <div className="container">
        <div className="container p-3 border rounded-3 shadow-sm" style={{ maxWidth: '600px' }}>
          <h2 className="my-4 text-center">Add Specialist</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Specialist Name</label>
              <input
                type="text"
                className="form-control"
                value={specialist}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Specialist</button>
          </form>
        </div>

        {/* Table to display all specialists */}
        <div className="container mt-4">
          {specialists.length > 0 && (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Specialist Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {specialists.map((specialist) => (
                  <tr key={specialist.id}>
                    <td>{specialist.name}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(specialist.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
