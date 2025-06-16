import "./ImageCarousel.css";


const ImageCarousel = ({ images }) => {
  return (
    <div
      id="ghostBillCarousel"
      className="carousel slide carousel-fade w-100"
      data-bs-ride="carousel"
      data-bs-interval="4000"
      data-bs-pause="hover"
    >
      {/* 1. Indicadores */}
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#ghostBillCarousel"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 2. Slides */}
      <div className="carousel-inner shadow-sm"
       style={{
                marginTop: "-24px",
              }}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            data-bs-interval={img.interval || 5000}
             
          >
            <img
              src={img.src}
              className="d-block img-fluid mx-auto"
              alt={img.alt || `Slide ${idx + 1}`}
              style={{ objectFit: "cover",
              }}
            />
            {img.caption && (
              <div className="carousel-caption d-none d-md-block">
                {img.caption.title && <h5>{img.caption.title}</h5>}
                {img.caption.text && <p>{img.caption.text}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Controles Prev/Next */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#ghostBillCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#ghostBillCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageCarousel;
