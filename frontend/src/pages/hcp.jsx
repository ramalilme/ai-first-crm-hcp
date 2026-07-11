import { useEffect, useState } from "react";
import api from "../api/api";

export default function HCP() {
  const [hcps, setHcps] = useState([]);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    hospital: "",
    city: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchHCPs();
  }, []);

  async function fetchHCPs() {
    const response = await api.get("/hcp/");
    setHcps(response.data);
  }

  async function addHCP() {
    try {
      await api.post("/hcp/", form);

      setForm({
        name: "",
        specialization: "",
        hospital: "",
        city: "",
        email: "",
        phone: "",
      });

      fetchHCPs();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Healthcare Professionals</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 300px)",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) =>
            setForm({
              ...form,
              specialization: e.target.value,
            })
          }
        />

        <input
          placeholder="Hospital"
          value={form.hospital}
          onChange={(e) =>
            setForm({
              ...form,
              hospital: e.target.value,
            })
          }
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />
      </div>

      <button onClick={addHCP}>
        Add HCP
      </button>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Hospital</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {hcps.map((hcp) => (
            <tr key={hcp.id}>
              <td>{hcp.name}</td>
              <td>{hcp.specialization}</td>
              <td>{hcp.hospital}</td>
              <td>{hcp.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}