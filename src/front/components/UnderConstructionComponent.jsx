  import construction from "../assets/img/zona-de-advertencia.jpg";

const UnderConstructionComponent = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <img
                src={construction}
                alt="Under Construction"
                className="img-fluid"
                style={{ maxWidth: "90%", maxHeight: "70vh" }}
            />
            <h2 className="mt-4">Coming Soon...</h2>
        </div>
    );
};

export default UnderConstructionComponent;
