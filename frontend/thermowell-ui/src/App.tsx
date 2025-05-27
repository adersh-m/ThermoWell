import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Advisories from "./pages/Advisories";
import Tips from "./pages/Tips";
import Resources from "./pages/Resources";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/advisories/:id" element={<Advisories />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Layout>
  );
};

export default App;
