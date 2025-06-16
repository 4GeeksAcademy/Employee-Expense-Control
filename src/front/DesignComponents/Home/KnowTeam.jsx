<<<<<<< HEAD
 import Teamfoto from "../../assets/img/teamfoto.jpg";
=======
import Teamfoto from "../../assets/img/teamfoto.jpg";
>>>>>>> 44c1bdc6af747345e6919a49c2bfbe6328c5118c
import "./KnowTeam.css";
//import "../DesignComponents/Login/Loginbutton.css";


export const KnowTeam = () => {

    return (
        <div className="row g-0 m-o w-100 headTeam">
            <div className="col-12 col-xl-7 headText">
                <h1 id="headTitle"> WE ARE GHOST BILL</h1>
                <p className="textParagraf" >

                    At Ghost Bill, we specialize in smart financial technology for modern businesses. Our focus is on simplifying expense management by helping companies seamlessly track, manage, and approve employee-related expenses — all in one secure digital space.
                </p>
                <p className="textParagraf">
                    We work closely with each client to understand their specific operational needs and offer tailored solutions that align with their goals and budget. Whether you're a startup or an established enterprise, Ghost Bill adapts to your scale.
                </p>
                <p className="textParagraf">
                    If your business needs a reliable platform to handle expense reports, digitize financial workflows, centralize receipts in the cloud, or streamline budget approvals — we’re here to make your processes more efficient, transparent, and productive. Our team is made up of financial tech experts dedicated to helping businesses grow through smart, intuitive solutions.
                </p>
                <p className="textParagraf">
                    Our team is made up of financial tech experts dedicated to helping businesses grow through smart, intuitive solutions.
                </p>
                <div >
                    <button className="meetTeambtn">Meet the team</button>
                </div>
            </div>

            <div className="col-12 col-xl-5 teamFoto"
            style={{
                        backgroundImage: `url(${Teamfoto})`,
                    }}
            >
                {/* <img
                    // src={Teamfoto}
                    
                    className="d-block img-fluid mx-auto"
                    alt="Financial photo from google"

                /> */}
            </div>

        </div>

    );
};