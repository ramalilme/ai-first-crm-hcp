import { useState } from "react";
import api from "../api/api";

export default function Assistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    try {
      const res = await api.post("/agent/chat", {
        message: message,
      });

      setResponse(res.data.message);

      setMessage("");
    } catch (err) {
      console.error(err);

      if (err.response) {
        setResponse(err.response.data.detail || "Something went wrong.");
      } else {
        setResponse("Network Error");
      }
    }
  }

  return (
    <>
      <h1>AI Assistant</h1>

      <textarea
        rows="8"
        cols="80"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your interaction..."
      />

      <br />
      <br />

      <button onClick={sendMessage}>
        Send
      </button>

      <br />
      <br />

      <strong>{response}</strong>
    </>
  );
}