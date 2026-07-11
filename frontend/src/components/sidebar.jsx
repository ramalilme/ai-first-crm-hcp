import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>AI-First CRM</h2>

      <br />

      <p>
        <Link to="/" style={{ color: "white" }}>
          Dashboard
        </Link>
      </p>

      <p>
        <Link to="/hcp" style={{ color: "white" }}>
          HCP
        </Link>
      </p>

      <p>
        <Link to="/interactions" style={{ color: "white" }}>
          Interactions
        </Link>
      </p>

      <p>
        <Link to="/assistant" style={{ color: "white" }}>
          AI Assistant
        </Link>
      </p>
    </div>
  );
}