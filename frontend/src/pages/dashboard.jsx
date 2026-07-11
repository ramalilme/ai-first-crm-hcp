import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../api/api";

export default function Dashboard() {
  const [hcpCount, setHcpCount] = useState("Loading...");
  const [interactionCount, setInteractionCount] = useState(0);
  const [followUpCount, setFollowUpCount] = useState(0);

  useEffect(() => {
    async function fetchHCPs() {
      try {
        const response = await api.get("/hcp/");
        setHcpCount(response.data.length);
      } catch (error) {
        alert(error.message);
      }
    }

    async function fetchInteractions() {
      try {
        const response = await api.get("/interaction/");

        setInteractionCount(response.data.length);

        const today = new Date();

        const upcoming = response.data.filter((item) => {
          if (!item.follow_up_date) return false;

          return new Date(item.follow_up_date) >= today;
        });

        setFollowUpCount(upcoming.length);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHCPs();
    fetchInteractions();
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

        <StatCard title="Interactions" value={interactionCount} />

        <StatCard title="Follow Ups" value={followUpCount} />

        <StatCard title="AI Notes" value="0" />
      </div>
    </>
  );
}