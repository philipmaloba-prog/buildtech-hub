import React from "react";

const About = () => {
  return (
    <div className="container mt-5 text-light">

      <div className="row align-items-center">

        {/* LEFT SIDE - TEXT */}
        <div className="col-md-6">
          <div className="p-4">
            <h2 className="text-success mb-3">
              <i className="bi bi-building me-2"></i>
              About BuildTech Hub
            </h2>

            <p className="lead">
              BuildTech Hub is your trusted partner for high-quality construction materials
              and tools. We aim to simplify the building process by providing reliable
              products at competitive prices.
            </p>

            <p>
              We connect builders, contractors, and homeowners with the best materials
              to bring their construction dreams to life.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - CAROUSEL */}
        <div className="col-md-6 position-relative">

          <div
            id="mycarousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner rounded shadow-lg overflow-hidden">

              {/* Slide 1 */}
              <div className="carousel-item active">
                <img
                  src="/images/slide1.jpg"
                  className="d-block w-100 carousel-img"
                  alt="slide1"
                />
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <img
                  src="/images/slide2.jpg"
                  className="d-block w-100 carousel-img"
                  alt="slide2"
                />
              </div>

              {/* Slide 3 */}
              <div className="carousel-item">
                <img
                  src="/images/slide3.jpg"
                  className="d-block w-100 carousel-img"
                  alt="slide3"
                />
              </div>

            </div>

            {/* INSIDE CAROUSEL CONTROLS */}
            <button
              className="carousel-control-prev custom-control"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next custom-control"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;