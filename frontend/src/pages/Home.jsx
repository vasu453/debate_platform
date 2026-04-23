import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [debates, setDebates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/debates")
      .then(res => setDebates(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>All Debates</h2>

      {debates.map(d => (
        <div
          key={d._id}
          className="card"
          onClick={() => navigate(`/debate/${d._id}`)}
          style={{ cursor: "pointer" }}
        >
          <h3>{d.title}</h3>
          <p>{d.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;