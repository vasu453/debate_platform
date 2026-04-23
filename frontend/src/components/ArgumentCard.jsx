import { useState } from "react";
import API from "../services/api";

function ArgumentCard({ arg }) {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");

  // 🔧 Color based on type
  const borderColor =
    arg.type === "pro"
      ? "#28a745"
      : arg.type === "con"
      ? "#dc3545"
      : "#999";

  return (
    <div
      className="card"
      style={{
        marginLeft: "20px",
        borderLeft: `4px solid ${borderColor}`,
        paddingLeft: "10px",
        marginTop: "10px"
      }}
    >
      {/* Content */}
      <p style={{ fontWeight: "500" }}>{arg.content}</p>

      {/* Vote Buttons */}
      <div style={{ marginTop: "5px" }}>
        <button
          className="upvote"
          onClick={() => {
            API.post("/votes", {
              argumentId: arg._id,
              value: 1,
            })
              .then(() => window.location.reload())
              .catch(err => console.log(err));
          }}
        >
          👍 {arg.upvotes}
        </button>

        <button
          className="downvote"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            API.post("/votes", {
              argumentId: arg._id,
              value: -1,
            })
              .then(() => window.location.reload())
              .catch(err => console.log(err));
          }}
        >
          👎 {arg.downvotes}
        </button>

        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Score: {arg.score}
        </span>
      </div>

      {/* Reply Button */}
      <button
        className="reply-btn"
        style={{ marginTop: "8px" }}
        onClick={() => setShowInput(!showInput)}
      >
        Reply
      </button>

      {/* Reply Input */}
      {showInput && (
        <div style={{ marginTop: "8px" }}>
          <input
            type="text"
            placeholder="Write your argument"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              if (!content.trim()) return;

              API.post("/arguments", {
                debateId: arg.debateId,
                parentId: arg._id,
                type: "rebuttal",
                content,
              })
                .then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Children (recursive) */}
      {arg.children &&
        arg.children.map(child => (
          <ArgumentCard key={child._id} arg={child} />
        ))}
    </div>
  );
}

export default ArgumentCard;