export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: "220px",
      }}
    >
      <h3 style={{ margin: 0, color: "#6b7280", fontSize: "16px" }}>
        {title}
      </h3>

      <h1 style={{ marginTop: "10px", fontSize: "36px" }}>
        {value}
      </h1>
    </div>
  );
}