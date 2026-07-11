import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
