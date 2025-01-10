import React from "react";
import doctor1 from "../images/doctor1.jpg";
import doctor2 from "../images/doctor2.jpg";
import doctor3 from "../images/doctor3.jpg";
import doctor4 from "../images/doctor4.jpg";
import doctor5 from "../images/doctor5.jpg";
import doctor6 from "../images/doctor6.jpg";
import doctor7 from "../images/doctor7.jpg";
import doctor8 from "../images/doctor8.jpg";
import homeimage from "../images/home_image.jpg";
import "../style/App.css";
import { Link } from "react-router-dom";

export default function HomeLander() {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      image: doctor1,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Dermatologist",
      image: doctor2,
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialization: "Neurologist",
      image: doctor3,
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      specialization: "Pediatrician",
      image: doctor4,
    },
    {
      id: 5,
      name: "Dr. Nayana",
      specialization: "General Medicine",
      image: doctor8,
    },
    {
      id: 6,
      name: "Dr. Marry Varges",
      specialization: "Neurologist",
      image: doctor6,
    },
    { id: 7, name: "Dr. David", specialization: "Orthopedist", image: doctor7 },
    {
      id: 8,
      name: "Dr. Sara",
      specialization: "Endocrinology",
      image: doctor5,
    },
  ];

  return (
    <>
      {/* First Div Container */}
      <div className="container p-3">
        <p
          className="text-center mt-2 mb-5 fs-2 myP-color heading"
          
        >
          Doctor-Patient Portal: Empowering Healthcare with Seamless
          Communication
        </p>

        <div className="row">
          {/* 1st Column for Cards */}
          <div className="col-md-8 p-5">
            <div className="row">
              {[
                {
                  title: "20,000+ Compassionate Providers",
                  description:
                    "A global network of highly qualified healthcare professionals dedicated to providing exceptional care.",
                },
                {
                  title: "Most Advanced Healthcare Technology",
                  description:
                    "E-Hospitals has been the pioneer in bringing ground-breaking health care technologies.",
                },
                {
                  title: "Best Clinical Outcomes",
                  description:
                    "E-Hospitals has consistently delivered best in class clinical outcomes.",
                },
                {
                  title: "500+ Pharmacies",
                  description:
                    "E-Hospital Pharmacy has over 500+ outlets covering the entire nation.",
                },
              ].map((feature, index) => (
                <div key={index} className="col-md-6 mt-2">
                  <div className="card my-card">
                    <div className="card-body">
                      <p className="fs-5 myP-color">{feature.title}</p>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2nd Column for Image */}
          <div className="col-md-4 mt-2 mys-card">
          <img
  className="mt-3 img-fluid"
  alt="Doctor"
  src={homeimage}
/>

          </div>
        </div>
      </div>
      <hr />

      {/* Second Div Container - Our Team */}
      <div className="container p-2 ">
        <p className="text-center fs-2 myP-color ">Our Team</p>
        <div className="row">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="col-md-3 ">
              <div className="card my-card my-3  ">
                <div className="card-body text-center ">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    height="300px"
                    width="270px"
                  />
                  <p className="fw-bold fs-5">{doctor.name}</p>
                  <p className="fs-7">({doctor.specialization})</p>
                  <Link className="btn btn-primary" to="/login">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
