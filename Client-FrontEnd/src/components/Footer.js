import React from "react";
import "../style/App.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="container-fluid my-0 px-0">
        <footer className="bg-light text-center">
          {/* Subscription Section */}
          <div className="container p-4 pb-0">
            <section>
              <form action="">
                <div className="row d-flex justify-content-center">
                  {/* Text for subscription */}
                  <div className="col-auto">
                    <p className="pt-2">
                      <strong>Sign up for our insurance</strong>
                    </p>
                  </div>
                  {/* Email input field */}
                  <div className="col-md-5 col-12">
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form5Example2"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                      <label className="form-label" htmlFor="form5Example2">
                        Email address
                      </label>
                    </div>
                  </div>
                  {/* Subscribe button */}
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-4">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Footer Bottom Section */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:{" "}
            <a
              className="text-dark"
              href="https://github.com/ajaikrishnan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ajaikrishnan
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
