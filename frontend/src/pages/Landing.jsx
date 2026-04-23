import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
  <h1 style={{ fontSize: "40px" }}>Debate Platform</h1>
  <p style={{ color: "#94a3b8" }}>
    Discuss. Debate. Decide.
  </p>

  <button
    style={{
      marginTop: "20px",
      background: "#6366f1",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px"
    }}
    onClick={() => navigate("/login")}
  >
    Login
  </button>
</div>
  );
}

export default Landing;