import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../api/api";

export default function Dashboard() {
  const [hcpCount, setHcpCount] = useState("Loading...");

  useEffect(() => {
    async function fetchHCPs() {
      try {
        const response = await api.get("/hcp/");
        setHcpCount(response.data.length);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchHCPs();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <StatCard title="Total HCPs" value={hcpCount} />

        <StatCard title="Interactions" value="0" />

        <StatCard title="Follow Ups" value="0" />

        <StatCard title="AI Notes" value="0" />
      </div>
    </>
  );
}