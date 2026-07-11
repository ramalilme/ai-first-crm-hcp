import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import HCP from "./pages/hcp";
import Interactions from "./pages/interactions";
import Assistant from "./pages/assistant";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hcp" element={<HCP />} />
        <Route path="/interactions" element={<Interactions />} />
        <Route path="/assistant" element={<Assistant />} />
      </Routes>
    </Layout>
  );
}

export default App;