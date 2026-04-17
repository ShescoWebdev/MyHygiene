import { useNavigate } from "react-router-dom";
import "./BookChoice.css"; // We will create this file below

export default function BookChoice() {
  const navigate = useNavigate();

  return (
    <div className="choice-container md:mt-[-5vh] md:pt-10 pt-5">
      <div className="choice-box">
        <h2 className="choice-title">How would you like to proceed?</h2>
        <p className="choice-subtitle">Log in to save your details for next time, or continue quickly as a guest.</p>

        <div className="choice-cards">
          {/* Guest Card */}
          <div className="card guest-card" onClick={() => navigate("/booking")}>
            <div className="card-icon">🚶</div>
            <h3>Continue as Guest</h3>
            <p>Book instantly without creating an account.</p>
            <button className="btn btn-outline">Proceed as Guest</button>
          </div>

          {/* Login/Register Card */}
          <div className="card auth-card" onClick={() => navigate("/auth?redirect=/booking")}>
            <div className="card-icon">🔒</div>
            <h3>Register and Login</h3>
            <p>Save your booking history and preferences.</p>
            <button className="btn btn-primary">Login to Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}