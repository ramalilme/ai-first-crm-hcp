import { useState } from "react";
import api from "../api/api";

export default function Assistant() {
  const [hcpName, setHcpName] = useState("");
  const [hcpId, setHcpId] = useState(null);
  const [interactionType, setInteractionType] = useState("Meeting");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [topics, setTopics] = useState("");
  const [materialsShared, setMaterialsShared] = useState("");
const [samplesDistributed, setSamplesDistributed] = useState("");
const [sentiment, setSentiment] = useState("");
const [outcomes, setOutcomes] = useState("");
const [followUpActions, setFollowUpActions] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  async function handleAILog() {
  const userMessage = {
    sender: "user",
    text: prompt,
  };

  setChatHistory((prev) => [...prev, userMessage]);

  try {
    const response = await api.post("/agent/chat", {
      message: prompt,
    });

    console.log(JSON.stringify(response.data, null, 2));
   

// Auto-fill the form from AI extraction
 setHcpId(response.data.hcp_id);
setHcpName(response.data.doctor_name || "");
setInteractionType(response.data.interaction_type || "");
setTopics(response.data.summary || "");
setAttendees(response.data.attendees || "");
setMaterialsShared(response.data.materials_shared || "");
setSamplesDistributed(response.data.samples_distributed || "");
setSentiment(response.data.sentiment || "");
setOutcomes(response.data.outcomes || "");
setFollowUpActions(response.data.follow_up_actions || "");

// TODO: Backend currently returns values like "in two weeks".
// The HTML date input only accepts YYYY-MM-DD.
// Leave the date unchanged until the backend returns an ISO date.
// if (response.data.follow_up_date) {
//   setDate(response.data.follow_up_date);
// }

const aiMessage = {
  sender: "ai",
  text: response.data.message,
};

setChatHistory((prev) => [...prev, aiMessage]);

setPrompt("");
  } catch (err) {
    console.error(err);
  }
}

async function handleSaveInteraction() {
    if (!hcpId) {
    alert("Please use the AI Assistant to select a valid HCP first.");
    return;
}
    try {

        const payload = {
            hcp_id: hcpId,
            interaction_type: interactionType,
            interaction_date: date || new Date().toISOString().split("T")[0],
            summary: topics,
            follow_up_date: null,
            sentiment: sentiment,
        };

        console.log("Payload:", payload);

        const response = await api.post("/interaction/", payload);

        alert("Interaction saved successfully!");

        console.log(response.data);

    } catch (err) {
        console.error("Save failed:", err);

        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Response:", err.response.data);
        }

        alert("Failed to save interaction.");
    }

}

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        height: "calc(100vh - 100px)",
      }}
    >
      {/* Left Panel */}

      <div
        style={{
          flex: 2,
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          overflowY: "auto",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Log HCP Interaction</h1>

        <h3 style={{ marginBottom: "20px" }}>Interaction Details</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "30px",
            rowGap: "25px",
          }}
        >
          <div>
            <label>HCP Name</label>

            <input
              type="text"
              value={hcpName}
              onChange={(e) => setHcpName(e.target.value)}
              placeholder="Dr. Smith"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label>Interaction Type</label>

            <select
              value={interactionType}
              onChange={(e) => setInteractionType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option>Meeting</option>
              <option>Doctor Visit</option>
              <option>Phone Call</option>
              <option>Email</option>
            </select>
          </div>

          <div>
            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Attendees</label>

          <input
            type="text"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            placeholder="Enter names..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Topics Discussed</label>

          <textarea
            rows="5"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Describe discussion..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Materials Shared</label>
          <textarea
            rows="2"
            value={materialsShared}
            onChange={(e) => setMaterialsShared(e.target.value)}
            placeholder="Brochures, presentations..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Samples Distributed</label>
          <input
            type="text"
            value={samplesDistributed}
            onChange={(e) => setSamplesDistributed(e.target.value)}
            placeholder="Samples distributed"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Observed HCP Sentiment</label>
          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select sentiment</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Outcomes</label>
          <textarea
            rows="3"
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value)}
            placeholder="Key outcomes"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Follow-up Actions</label>
          <textarea
            rows="3"
            value={followUpActions}
            onChange={(e) => setFollowUpActions(e.target.value)}
            placeholder="Follow-up actions"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div
  style={{
    marginTop: "40px",
    display: "flex",
    justifyContent: "flex-end",
  }}
>
<button
    onClick={handleSaveInteraction}
    style={{
        background: "#1677ff",
        color: "white",
        padding: "14px 28px",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
    }}
>
    Save Interaction
</button>
</div>

      </div>

     
   

      {/* Right Panel */}

      <div
        style={{
          flex: 1,
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 150px)",
        }}
      >
        <h2>🤖 AI Assistant</h2>

        <p style={{ color: "#666", marginTop: "-10px" }}>
          Log interaction details here via chat
        </p>

        <hr />

        <div
          style={{
            background: "#dff3ff",
            padding: "18px",
            borderRadius: "10px",
            marginTop: "18px",
            marginBottom: "18px",
            color: "#444",
            lineHeight: "1.6",
            fontSize: "15px",
          }}
        >
          Log interaction details here (e.g. "Met Dr. Smith, discussed Product X
          efficacy, positive sentiment, shared brochures") or ask for help.
        </div>

        <div
  style={{
    flex: 1,
    overflowY: "auto",
    marginBottom: "20px",
    paddingRight: "5px",
  }}
>
  {chatHistory.map((msg, index) => (
    <div
      key={index}
      style={{
        background: msg.sender === "user" ? "#f4f4f4" : "#e8ffe8",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "12px",
        borderLeft:
          msg.sender === "user"
            ? "4px solid #1677ff"
            : "4px solid #2ecc71",
      }}
    >
      {msg.text}
    </div>
  ))}
</div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >

        



          <input
  type="text"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Describe Interaction..."
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "2px solid #222",
              fontSize: "15px",
            }}
          />

<button
  onClick={handleAILog}
  style={{
    width: "100px",
    height: "48px",
    background: "#1677ff",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  }}
>
  AI Log
</button>
        </div>
      </div>
    </div>
  );
}