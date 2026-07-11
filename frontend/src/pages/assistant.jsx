import { useEffect, useRef, useState } from "react";
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
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  async function handleAILog() {
    const userMessage = {
      sender: "user",
      text: prompt,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await api.post("/agent/chat", {
        message: prompt,
      });
      console.log("AI Response:", response.data);

      // If the backend performed an edit, refresh the form from the latest interaction.
      if (response.data.intent === "edit_interaction" && response.data.hcp_id) {
        try {
          const interactionsResponse = await api.get("/interaction/");

          const latest = interactionsResponse.data
            .filter((i) => i.hcp_id === response.data.hcp_id)
            .sort((a, b) => b.id - a.id)[0];

          if (latest) {
            setHcpId(latest.hcp_id);
            setInteractionType(latest.interaction_type || "");
            setTopics(latest.summary || "");
            setSentiment(latest.sentiment || "");

            if (latest.interaction_date) {
              setDate(latest.interaction_date);
            }

            if (latest.follow_up_date) {
              setDate(latest.follow_up_date);
            }
          }
        } catch (refreshError) {
          console.error("Failed to refresh interaction:", refreshError);
        }
      }

      console.log(JSON.stringify(response.data, null, 2));

      // Set intent and conditionally auto-fill the form if logging an interaction
      setIntent(response.data.intent);

      if (
        response.data.intent === "followup_recommendation" &&
        response.data.recommendations?.length
      ) {
        setRecommendations(response.data.recommendations);
        let aiText =
          "✅ AI Recommended Next Steps\n\n• " +
          response.data.recommendations.join("\n• ");

        const aiMessage = {
          sender: "ai",
          text: aiText,
        };

        setChatHistory((prev) => [...prev, aiMessage]);

        setPrompt("");
        setLoading(false);
        return;
      }

      if (response.data.intent === "log_interaction") {
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
        setRecommendations([]);
        setDate(new Date().toISOString().split("T")[0]);

      }

      // TODO: Backend currently returns values like "in two weeks".
      // The HTML date input only accepts YYYY-MM-DD.
      // Leave the date unchanged until the backend returns an ISO date.
      // if (response.data.follow_up_date) {
      //   setDate(response.data.follow_up_date);
      // }

      let aiText = response.data.message;

      if (response.data.intent === "search_hcp") {
        aiText = `🔍 HCP Found\n\nDoctor: ${response.data.doctor_name}\nHCP ID: ${response.data.hcp_id}\n\nYou can now log or summarize interactions for this doctor.`;
      }

      if (response.data.intent === "summarize_interaction" && response.data.summary) {
        aiText = `📄 Interaction Summary\n\n${response.data.summary}`;
      }

      if (response.data.intent === "edit_interaction") {
        aiText = `✏️ Interaction Updated Successfully\n\nThe requested changes have been applied while keeping the remaining interaction details unchanged.`;
      }

      if (response.data.intent === "log_interaction") {
        aiText = `✅ Interaction Logged Successfully\n\nThe interaction details have been extracted and the form has been populated automatically.\n\n✔ Doctor identified\n✔ Summary generated\n✔ Sentiment detected\n\nWould you like me to recommend follow-up actions for this HCP?`;
      }

      const aiMessage = {
        sender: "ai",
        text: aiText,
      };

      setChatHistory((prev) => [...prev, aiMessage]);

      setPrompt("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
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

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: hcpId ? "#ecfdf3" : "#fff8e6",
    border: `1px solid ${hcpId ? "#86efac" : "#fde68a"}`,
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "24px",
  }}
>
  <div>
    <strong>
      {hcpId ? "🤖 AI Interaction Ready" : "⏳ Waiting for AI"}
    </strong>

    <div
      style={{
        fontSize: "14px",
        color: "#555",
        marginTop: "4px",
      }}
    >
      {hcpId
        ? "The AI has populated this interaction. Review the details before saving."
        : "Describe an interaction in the AI Assistant to populate this form automatically."}
    </div>
  </div>
</div>
        
        
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
              readOnly 
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
              disabled={!hcpId}
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
              readOnly 
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
            readOnly
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
            readOnly
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
            readOnly
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
            readOnly
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
          <label style={{ display: "block", marginBottom: "12px" }}>
            Observed HCP Sentiment
          </label>

          <div
            style={{
              display: "flex",
              gap: "24px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            {[
              { label: "🙂 Positive", value: "Positive" },
              { label: "😐 Neutral", value: "Neutral" },
              { label: "☹️ Negative", value: "Negative" },
            ].map((option) => (
              <label
                key={option.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  fontWeight: sentiment === option.value ? "600" : "400",
                }}
              >
                <input
                  type="radio"
                  name="sentiment"
                  value={option.value}
                  checked={sentiment === option.value}
                  onChange={(e) => setSentiment(e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <label>Outcomes</label>
          <textarea
            rows="3"
            value={outcomes}
            readOnly
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
            readOnly
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
        {recommendations.length > 0 && (
          <div
            style={{
              marginTop: "30px",
              background: "#eef8ff",
              border: "1px solid #b7dbff",
              borderRadius: "10px",
              padding: "18px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#1677ff" }}>
              🤖 AI Suggested Follow-up
            </h3>

            <ul style={{ marginBottom: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
              {recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
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
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  background: msg.sender === "user" ? "#1677ff" : "#f6f8fb",
                  color: msg.sender === "user" ? "white" : "#222",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: msg.sender === "user" ? "none" : "1px solid #e5e7eb",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "6px" }}>
                  {msg.sender === "user" ? "👤 You" : "🤖 AI Assistant"}
                </div>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#666", marginBottom: "12px" }}>
              🤖 AI Assistant is thinking...
            </div>
          )}
          <div ref={chatEndRef} />
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleAILog();
              }
            }}
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
            disabled={loading}
            style={{
              width: "100px",
              height: "48px",
              background: "#1677ff",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontSize: "15px",
            }}
          >
            {loading ? "Thinking..." : "AI Log"}
          </button>
        </div>
      </div>
    </div>
  );
}