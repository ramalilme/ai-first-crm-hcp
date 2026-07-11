import { useEffect, useState } from "react";
import api from "../api/api";

export default function Interactions() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetchInteractions();
  }, []);

  async function fetchInteractions() {
    try {
      const response = await api.get("/interaction/");
      setInteractions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Interactions</h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>HCP ID</th>
            <th>Type</th>
            <th>Summary</th>
            <th>Follow Up</th>
          </tr>
        </thead>

        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td>{interaction.id}</td>
              <td>{interaction.hcp_id}</td>
              <td>{interaction.interaction_type}</td>
              <td>{interaction.summary}</td>
              <td>{interaction.follow_up_date || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}