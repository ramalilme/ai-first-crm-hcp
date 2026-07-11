import { useState } from "react";

export default function Assistant() {
  const [hcpName, setHcpName] = useState("");
  const [interactionType, setInteractionType] = useState("Meeting");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [topics, setTopics] = useState("");

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
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "18px",
            overflowY: "auto",
            marginBottom: "18px",
          }}
        >
          Chat history
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