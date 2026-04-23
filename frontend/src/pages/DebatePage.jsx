import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ArgumentCard from "../components/ArgumentCard";
function DebatePage() {
  
  const { id } = useParams();
  const [newArg, setNewArg] = useState("");
  const [type, setType] = useState("pro");

  const [argumentsData, setArgumentsData] = useState([]);

  useEffect(() => {
    API.get(`/arguments/${id}`)
      .then(res => {
        console.log(res.data); // 🔧 DEBUG
        setArgumentsData(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}></div>
      <h2>Debate</h2>
<h3>Add Argument</h3>
<div style={{ marginBottom: "10px" }}>
  <button
    onClick={() => setType("pro")}
    style={{
      marginRight: "10px",
      background: type === "pro" ? "#22c55e" : "#334155",
      color: "white"
    }}
  >
    Pro
  </button>

  <button
    onClick={() => setType("con")}
    style={{
      background: type === "con" ? "#ef4444" : "#334155",
      color: "white"
    }}
  >
    Con
  </button>
</div>
<input
  type="text"
  placeholder="Write new argument"
  value={newArg}
  onChange={(e) => setNewArg(e.target.value)}
/>

<button
  onClick={() => {
    API.post("/arguments", {
      debateId: id,
      type: type, // 🔧 you can improve later
      content: newArg,
    })
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  }}
>
  Submit
</button>
    {argumentsData.map(arg => (
  <ArgumentCard key={arg._id} arg={arg} />
))}
    </div>
  );
}

export default DebatePage;